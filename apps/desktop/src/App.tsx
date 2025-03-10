import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { MediaLibrary } from './pages/MediaLibrary';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Import</h2>
          <div className="mt-2 space-y-2">
            <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Import Files
            </button>
            <button className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Scan Library
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Statistics</h2>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Files: 0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Size: 0 MB</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Import: Never</p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Processing</h2>
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI processing is ready. Import files to begin automatic organization.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Media</h2>
        </div>
        <div className="p-4">
          <MediaLibrary />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/libraries" element={<MediaLibrary />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/tags" element={<div>Tags page coming soon...</div>} />
          <Route path="/settings" element={<div>Settings page coming soon...</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
