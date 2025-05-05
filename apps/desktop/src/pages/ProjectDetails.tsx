import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabaseStore } from '@/stores/databaseStore';
import { ArrowPathIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ProjectFile {
  project_id: string;
  file_path: string;
}

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, getProjectFiles } = useDatabaseStore();
  const [project, setProject] = useState<{ project_name: string } | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        setError(null);

        const projectData = await getProject(projectId);
        if (!projectData) {
          setError('Project not found');
          return;
        }

        setProject(projectData);
        const projectFiles = await getProjectFiles(projectId);
        setFiles(projectFiles);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [projectId, getProject, getProjectFiles]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center gap-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">{project.project_name}</h1>
      </div>

      <div className="flex-1 overflow-auto">
        {files.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No files in this project</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map((file) => (
              <div
                key={file.file_path}
                className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100"
              >
                <img
                  src={`file://${file.file_path}`}
                  alt={file.file_path.split('/').pop()}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="truncate text-sm text-white">
                    {file.file_path.split('/').pop()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 