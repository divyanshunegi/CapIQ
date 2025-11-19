import { useState, useCallback, useRef } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { readDir } from '@tauri-apps/plugin-fs';
import { basename, dirname, join } from '@tauri-apps/api/path';
import { generateProjectId, sanitizeProjectName } from '@/utils/projectUtils';
import { useDatabaseStore } from '@/stores/databaseStore';

const VIDEO_EXTENSIONS = [
  '.mp4',
  '.mov',
  '.avi',
  '.mkv',
  '.wmv',
  '.flv',
  '.webm',
] as const;

interface ProjectCreationState {
  isDialogOpen: boolean;
  fileCount: number;
  defaultProjectName: string;
  selectedFiles: File[];
  isCreating: boolean;
  error: string | null;
  selectedDirectory: string | null;
}

const initialState: ProjectCreationState = {
  isDialogOpen: false,
  fileCount: 0,
  defaultProjectName: '',
  selectedFiles: [],
  isCreating: false,
  error: null,
  selectedDirectory: null,
};

export const useProjectCreation = () => {
  const [state, setState] = useState<ProjectCreationState>(initialState);
  const processingRef = useRef(false);

  const {
    createProject,
    addFilesToProject,
    initializeDatabase,
    isInitialized,
    db,
    triggerRefresh,
  } = useDatabaseStore();

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const ensureDatabase = async () => {
    if (!isInitialized || !db) {
      try {
        await initializeDatabase();
        if (!db) {
          throw new Error('Database failed to initialize properly');
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
        throw new Error('Failed to initialize database. Please try again.');
      }
    }
  };

  const isVideoFile = (filename: string): boolean => {
    const extIndex = filename.lastIndexOf('.');
    if (extIndex === -1) {
      return false;
    }

    const ext = filename.toLowerCase().slice(extIndex);
    return VIDEO_EXTENSIONS.includes(ext as (typeof VIDEO_EXTENSIONS)[number]);
  };

  const collectDirectoryVideos = useCallback(
    async (directoryPath: string, directoryName: string) => {
      const collectedFiles: File[] = [];

      const walk = async (currentPath: string, relativePrefix = '') => {
        const entries = await readDir(currentPath);

        await Promise.all(
          entries.map(async (entry) => {
            const relativePath = relativePrefix
              ? `${relativePrefix}/${entry.name}`
              : entry.name;

            if (entry.isDirectory) {
              const nestedPath = await join(currentPath, entry.name);
              await walk(nestedPath, relativePath);
              return;
            }

            if (!entry.isFile || !isVideoFile(entry.name)) {
              return;
            }

            const file = new File([], entry.name, { type: 'video/*' });
            Object.defineProperty(file, 'webkitRelativePath', {
              value: `${directoryName}/${relativePath}`,
              writable: false,
            });
            collectedFiles.push(file);
          }),
        );
      };

      await walk(directoryPath);
      return collectedFiles;
    },
    [],
  );

  const processFiles = useCallback(
    async (files: File[], directoryName?: string) => {
      if (processingRef.current) return;
      processingRef.current = true;

      try {
        const videoFiles = files.filter((file) => isVideoFile(file.name));

        if (videoFiles.length === 0) {
          setState((prev) => ({
            ...prev,
            error: 'No valid video files found',
          }));
          return;
        }

        const newProjectName = directoryName
          ? sanitizeProjectName(directoryName)
          : sanitizeProjectName(
              (await basename(videoFiles[0].name)).split('.')[0],
            );

        setState((prev) => ({
          ...prev,
          selectedFiles: videoFiles,
          fileCount: videoFiles.length,
          defaultProjectName: newProjectName,
          isDialogOpen: true,
          error: null,
        }));
      } catch (error) {
        console.error('Error processing files:', error);
        setState((prev) => ({ ...prev, error: 'Failed to process files' }));
      } finally {
        processingRef.current = false;
      }
    },
    [],
  );

  const handleFileSelection = useCallback(async () => {
    try {
      await ensureDatabase();

      const selected = await open({
        multiple: true,
        directory: true,
        filters: [
          {
            name: 'Video Files',
            extensions: VIDEO_EXTENSIONS.map((ext) => ext.slice(1)),
          },
        ],
      });

      if (!selected) return;

      const paths = Array.isArray(selected) ? selected : [selected];
      const files: File[] = [];
      let directoryName: string | undefined;

      for (const path of paths) {
        if (typeof path === 'string') {
          const isDirectory = await readDir(path)
            .then(() => true)
            .catch(() => false);

          if (isDirectory) {
            directoryName = await basename(path);
            setState((prev) => ({ ...prev, selectedDirectory: path }));

            const directoryFiles = await collectDirectoryVideos(
              path,
              directoryName,
            );
            files.push(...directoryFiles);
          } else if (isVideoFile(path)) {
            const fileName = await basename(path);
            files.push(new File([], fileName, { type: 'video/*' }));
          }
        }
      }

      await processFiles(files, directoryName);
    } catch (error) {
      console.error('Error selecting files:', error);
      setState((prev) => ({ ...prev, error: 'Failed to select files' }));
    }
  }, [processFiles]);

  const handleProjectCreation = useCallback(
    async (projectName: string) => {
      const { selectedFiles, selectedDirectory } = state;
      if (!selectedFiles.length) {
        setState((prev) => ({ ...prev, error: 'No files selected' }));
        return;
      }

      setState((prev) => ({ ...prev, isCreating: true, error: null }));

      try {
        await ensureDatabase();

        const projectId = generateProjectId();
        const baseDir =
          selectedDirectory || (await dirname(selectedFiles[0].name));

        // Create project in database
        await createProject({
          project_id: projectId,
          project_name: projectName,
          base_dir: baseDir,
          status: 'processing',
        });

        // Add files to project
        const projectFiles = selectedFiles.map((file) => ({
          project_id: projectId,
          file_path: file.webkitRelativePath || file.name,
        }));

        try {
          await addFilesToProject(projectFiles);
        } catch (fileError) {
          console.error('Error adding files to project:', fileError);
          // Continue with project creation even if file addition fails
        }

        resetState();
        triggerRefresh();
      } catch (error) {
        console.error('Error creating project:', error);
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error &&
            error.message.includes('database is locked')
              ? 'Database is busy. Please wait a moment and try again.'
              : 'Failed to create project. Please try again.',
        }));
        throw error;
      } finally {
        setState((prev) => ({ ...prev, isCreating: false }));
      }
    },
    [state, createProject, addFilesToProject, resetState, triggerRefresh],
  );

  return {
    ...state,
    setIsDialogOpen: (isOpen: boolean) =>
      setState((prev) => ({ ...prev, isDialogOpen: isOpen })),
    handleFileSelection,
    handleProjectCreation,
    processFiles,
  };
};
