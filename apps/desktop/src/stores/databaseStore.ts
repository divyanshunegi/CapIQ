import { create } from 'zustand';
import Database from '@tauri-apps/plugin-sql';

interface Project {
  project_id: string;
  project_name: string;
  base_dir: string;
  status: 'processing' | 'success' | 'fail';
}

interface ProjectFile {
  project_id: string;
  file_path: string;
}

interface DatabaseState {
  db: Database | null;
  isInitialized: boolean;
  error: string | null;
  lastUpdate: number;
  isConnecting: boolean;
  initializeDatabase: () => Promise<void>;
  createProject: (project: Omit<Project, 'id'>) => Promise<void>;
  addFilesToProject: (files: Omit<ProjectFile, 'id'>[]) => Promise<void>;
  getProject: (projectId: string) => Promise<Project | null>;
  getProjectFiles: (projectId: string) => Promise<ProjectFile[]>;
  getAllProjects: () => Promise<Project[]>;
  updateProjectStatus: (
    projectId: string,
    status: Project['status'],
  ) => Promise<void>;
  triggerRefresh: () => void;
}

// Helper function to ensure database is initialized with timeout
const ensureDatabase = async (
  db: Database | null,
  timeout = 5000,
): Promise<Database> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    // Test connection with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    await Promise.race([
      db.execute('SELECT 1'),
      new Promise((_, reject) => {
        controller.signal.addEventListener('abort', () =>
          reject(new Error('Database connection timeout')),
        );
      }),
    ]);

    clearTimeout(timeoutId);
    return db;
  } catch (error) {
    throw new Error('Database connection failed');
  }
};

// Helper function to handle database operations with retries and exponential backoff
const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000,
  maxDelay = 5000,
): Promise<T> => {
  let lastError;
  let delay = initialDelay;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (
        error instanceof Error &&
        error.message.includes('database is locked')
      ) {
        // Exponential backoff with jitter
        const jitter = Math.random() * 200;
        await new Promise((resolve) =>
          setTimeout(resolve, Math.min(delay + jitter, maxDelay)),
        );
        delay *= 2;
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

// Batch insert helper for better performance
const batchInsert = async (
  db: Database,
  files: Omit<ProjectFile, 'id'>[],
  batchSize = 100,
) => {
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const values = batch
      .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
      .join(',');

    const params = batch.flatMap((file) => [file.project_id, file.file_path]);

    await db.execute(
      `INSERT INTO files (project_id, file_path) VALUES ${values}`,
      params,
    );
  }
};

export const useDatabaseStore = create<DatabaseState>((set, get) => ({
  db: null,
  isInitialized: false,
  error: null,
  lastUpdate: Date.now(),
  isConnecting: false,

  triggerRefresh: () => {
    set({ lastUpdate: Date.now() });
  },

  initializeDatabase: async () => {
    if (get().isConnecting) return;
    set({ isConnecting: true });

    try {
      const db = await Database.load('sqlite:capteriq.db');

      // Performance optimizations
      await db.execute(`
        PRAGMA journal_mode=WAL;
        PRAGMA synchronous=NORMAL;
        PRAGMA temp_store=MEMORY;
        PRAGMA busy_timeout=5000;
        PRAGMA cache_size=10000;
      `);

      set({
        db,
        isInitialized: true,
        error: null,
        isConnecting: false,
      });
    } catch (error) {
      console.error('Failed to initialize database:', error);
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to initialize database',
        isInitialized: false,
        isConnecting: false,
      });
      throw error;
    }
  },

  createProject: async (project) => {
    const db = await ensureDatabase(get().db);

    return withRetry(async () => {
      await db.execute('BEGIN IMMEDIATE TRANSACTION');
      try {
        await db.execute(
          'INSERT INTO projects (project_id, project_name, base_dir, status) VALUES ($1, $2, $3, $4)',
          [
            project.project_id,
            project.project_name,
            project.base_dir,
            project.status,
          ],
        );
        await db.execute('COMMIT');
        get().triggerRefresh();
      } catch (error) {
        await db.execute('ROLLBACK');
        throw error;
      }
    });
  },

  addFilesToProject: async (files) => {
    const db = await ensureDatabase(get().db);

    return withRetry(
      async () => {
        await db.execute('BEGIN IMMEDIATE TRANSACTION');
        try {
          await batchInsert(db, files);
          await db.execute('COMMIT');
          get().triggerRefresh();
        } catch (error) {
          await db.execute('ROLLBACK');
          throw error;
        }
      },
      5,
      2000,
    );
  },

  getProject: async (projectId) => {
    const db = await ensureDatabase(get().db);

    return withRetry(async () => {
      const result = await db.select<Project[]>(
        'SELECT * FROM projects WHERE project_id = $1',
        [projectId],
      );
      return result.length > 0 ? result[0] : null;
    });
  },

  getProjectFiles: async (projectId) => {
    const db = await ensureDatabase(get().db);

    return withRetry(async () => {
      return await db.select<ProjectFile[]>(
        'SELECT * FROM files WHERE project_id = $1 ORDER BY created_at DESC',
        [projectId],
      );
    });
  },

  getAllProjects: async () => {
    const db = await ensureDatabase(get().db);

    return withRetry(async () => {
      return await db.select<Project[]>(
        'SELECT * FROM projects ORDER BY id DESC LIMIT 100',
      );
    });
  },

  updateProjectStatus: async (projectId, status) => {
    const db = await ensureDatabase(get().db);

    return withRetry(async () => {
      await db.execute('BEGIN IMMEDIATE TRANSACTION');
      try {
        await db.execute(
          'UPDATE projects SET status = $1 WHERE project_id = $2',
          [status, projectId],
        );
        await db.execute('COMMIT');
        get().triggerRefresh();
      } catch (error) {
        await db.execute('ROLLBACK');
        throw error;
      }
    });
  },
}));
