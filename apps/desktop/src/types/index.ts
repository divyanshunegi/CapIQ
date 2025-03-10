export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  projects: string[]; // Project IDs
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'late' | 'half-day';
  notes?: string;
}

export interface DragItem {
  type: string;
  id: string;
  index: number;
} 