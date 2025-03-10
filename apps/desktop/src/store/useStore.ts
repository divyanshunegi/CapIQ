import { create } from 'zustand';
import { Project, Employee, Attendance } from '../types';

interface AppState {
  // Project States
  projects: Project[];
  selectedProjectId: string | null;
  projectView: 'grid' | 'list' | 'kanban';
  projectFilter: 'all' | 'active' | 'completed' | 'archived';
  
  // Employee States
  employees: Employee[];
  selectedEmployeeId: string | null;
  employeeFilter: 'all' | 'active' | 'inactive';
  
  // Attendance States
  attendanceRecords: Attendance[];
  selectedDate: Date;
  
  // UI States
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalType: 'project' | 'employee' | 'attendance' | null;
  isDragging: boolean;
  
  // Actions
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (id: string | null) => void;
  setProjectView: (view: 'grid' | 'list' | 'kanban') => void;
  setProjectFilter: (filter: 'all' | 'active' | 'completed' | 'archived') => void;
  toggleSidebar: () => void;
  setModalOpen: (open: boolean, type?: 'project' | 'employee' | 'attendance' | null) => void;
  setIsDragging: (dragging: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial States
  projects: [],
  selectedProjectId: null,
  projectView: 'grid',
  projectFilter: 'all',
  employees: [],
  selectedEmployeeId: null,
  employeeFilter: 'all',
  attendanceRecords: [],
  selectedDate: new Date(),
  sidebarOpen: true,
  modalOpen: false,
  modalType: null,
  isDragging: false,

  // Actions
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (id) => set({ selectedProjectId: id }),
  setProjectView: (view) => set({ projectView: view }),
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setModalOpen: (open, type = null) => set({ modalOpen: open, modalType: type }),
  setIsDragging: (dragging) => set({ isDragging: dragging }),
})); 