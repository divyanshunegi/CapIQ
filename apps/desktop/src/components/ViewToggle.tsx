import React from 'react';
import { useStore } from '../store/useStore';

export const ViewToggle: React.FC = () => {
  const { projectView, setProjectView } = useStore();

  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      <button
        onClick={() => setProjectView('grid')}
        className={`inline-flex items-center px-4 py-2 rounded-md ${
          projectView === 'grid'
            ? 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        Grid
      </button>

      <button
        onClick={() => setProjectView('list')}
        className={`inline-flex items-center px-4 py-2 rounded-md ${
          projectView === 'list'
            ? 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        List
      </button>

      <button
        onClick={() => setProjectView('kanban')}
        className={`inline-flex items-center px-4 py-2 rounded-md ${
          projectView === 'kanban'
            ? 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Kanban
      </button>
    </div>
  );
}; 