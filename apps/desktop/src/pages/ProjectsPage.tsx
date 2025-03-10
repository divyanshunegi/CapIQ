import React, { useEffect } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ViewToggle } from '../components/ViewToggle';
import { ProjectFilter } from '../components/ProjectFilter';
import { useDragDrop } from '../hooks/useDragDrop';
import { useStore } from '../store/useStore';
import { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    projectView,
    projectFilter,
    setProjects,
    setModalOpen,
    setIsDragging,
  } = useStore();

  const { handleDragStart, handleDragEnter, handleDragEnd } = useDragDrop(
    projects,
    (fromIndex, toIndex) => {
      const newProjects = [...projects];
      const [movedProject] = newProjects.splice(fromIndex, 1);
      newProjects.splice(toIndex, 0, movedProject);
      setProjects(newProjects);
    }
  );

  // Filter projects based on status
  const filteredProjects = projects.filter((project) =>
    projectFilter === 'all' ? true : project.status === projectFilter
  );

  const handleAddProject = () => {
    setModalOpen(true, 'project');
  };

  // Handle drag and drop visual feedback
  const handleDragStartWithFeedback = (
    e: React.DragEvent,
    type: string,
    id: string,
    index: number
  ) => {
    setIsDragging(true);
    handleDragStart(e, type, id, index);
  };

  const handleDragEndWithFeedback = (e: React.DragEvent) => {
    setIsDragging(false);
    handleDragEnd(e);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <div className="flex items-center space-x-4">
          <ProjectFilter />
          <ViewToggle />
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Project
          </button>
        </div>
      </div>

      <div
        className={
          projectView === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : projectView === 'list'
            ? 'space-y-4'
            : 'flex space-x-6 overflow-x-auto pb-4'
        }
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onDragStart={handleDragStartWithFeedback}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEndWithFeedback}
          />
        ))}
      </div>
    </div>
  );
}; 