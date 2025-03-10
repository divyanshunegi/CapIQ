import React from 'react';
import { useStore } from '../store/useStore';

export const ProjectFilter: React.FC = () => {
  const { projectFilter, setProjectFilter } = useStore();

  const filters: { value: 'all' | 'active' | 'completed' | 'archived'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <div className="inline-flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Status:</span>
      <select
        value={projectFilter}
        onChange={(e) => setProjectFilter(e.target.value as typeof projectFilter)}
        className="rounded-md border-gray-300 py-1 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}; 