import { useState, useCallback } from 'react';
import { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = useCallback((project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date() }
        : project
    ));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  }, []);

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
}; 