import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onDragStart: (e: React.DragEvent, type: string, id: string, index: number) => void;
  onDragEnter: (e: React.DragEvent, type: string, id: string, index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, 'project', project.id, index)}
      onDragEnter={(e) => onDragEnter(e, 'project', project.id, index)}
      onDragEnd={onDragEnd}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          project.status === 'active' ? 'bg-green-100 text-green-800' :
          project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {project.status}
        </span>
      </div>
      {project.description && (
        <p className="mt-2 text-sm text-gray-500">{project.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Created: {project.createdAt.toLocaleDateString()}</span>
        <span>Updated: {project.updatedAt.toLocaleDateString()}</span>
      </div>
    </div>
  );
}; 