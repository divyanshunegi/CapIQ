import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { FolderIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useDatabaseStore } from '@/stores/databaseStore';
import { useNavigate } from 'react-router-dom';

interface Project {
  project_id: string;
  project_name: string;
  status: 'processing' | 'success' | 'fail';
}

interface ProjectListProps {
  searchQuery: string;
}

// Memoized loading spinner component
const LoadingSpinner = memo(() => (
  <div
    className="flex items-center justify-center py-4"
    role="status"
    aria-label="Loading projects"
  >
    <ArrowPathIcon className="h-5 w-5 animate-spin text-gray-500" />
    <span className="sr-only">Loading projects...</span>
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

// Memoized error message component
const ErrorMessage = memo(
  ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <p className="text-sm text-red-500" role="alert">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-1 rounded-md px-3 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        aria-label="Retry loading projects"
      >
        <ArrowPathIcon className="h-4 w-4" />
        Retry
      </button>
    </div>
  ),
);
ErrorMessage.displayName = 'ErrorMessage';

// Memoized project item component
const ProjectItem = memo(
  ({ project, onClick }: { project: Project; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
      role="listitem"
    >
      <FolderIcon className="h-4 w-4 text-gray-500 transition-colors group-hover:text-gray-700" />
      <span className="truncate">{project.project_name}</span>
      {project.status === 'processing' && (
        <span className="ml-auto rounded bg-yellow-50 px-1.5 py-0.5 text-xs text-yellow-600">
          Processing
        </span>
      )}
      {project.status === 'fail' && (
        <span className="ml-auto rounded bg-red-50 px-1.5 py-0.5 text-xs text-red-600">
          Failed
        </span>
      )}
    </button>
  ),
);
ProjectItem.displayName = 'ProjectItem';

export const ProjectList = ({ searchQuery }: ProjectListProps) => {
  const navigate = useNavigate();
  const { getAllProjects, initializeDatabase, isInitialized, lastUpdate } =
    useDatabaseStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const loadProjects = useCallback(async () => {
    if (!isInitialized) {
      try {
        await initializeDatabase();
      } catch (err) {
        console.error('Failed to initialize database:', err);
        if (!isInitialLoad) {
          setError('Failed to initialize database. Please try again.');
        }
        setIsLoading(false);
        return;
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      const projectList = await getAllProjects();
      setProjects(projectList);
      setIsInitialLoad(false);
    } catch (err) {
      if (!isInitialLoad) {
        console.error('Failed to load projects:', err);
        setError('Failed to load projects. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [getAllProjects, initializeDatabase, isInitialized, isInitialLoad]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects, lastUpdate, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  const navigateToProject = useCallback(
    (projectId: string) => {
      navigate(`/project/${projectId}`);
    },
    [navigate],
  );

  const filteredAndSortedProjects = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();

    const filtered = normalizedSearch
      ? projects.filter((project) =>
          project.project_name.toLowerCase().includes(normalizedSearch),
        )
      : projects;

    return filtered.sort((a, b) => {
      if (a.status === 'processing' && b.status !== 'processing') return -1;
      if (b.status === 'processing' && a.status !== 'processing') return 1;
      return a.project_name.localeCompare(b.project_name);
    });
  }, [projects, searchQuery]);

  if (isLoading && isInitialLoad) {
    return <LoadingSpinner />;
  }

  if (error && !isInitialLoad) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (filteredAndSortedProjects.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-4 text-sm text-gray-500"
        role="status"
        aria-label={
          searchQuery.trim()
            ? 'No matching projects found'
            : 'No projects available'
        }
      >
        <p>
          {searchQuery.trim()
            ? 'No matching projects found'
            : 'No projects yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1" role="list" aria-label="Projects list">
      {filteredAndSortedProjects.map((project) => (
        <ProjectItem
          key={project.project_id}
          project={project}
          onClick={() => navigateToProject(project.project_id)}
        />
      ))}
    </div>
  );
};
