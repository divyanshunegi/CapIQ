import { Sidebar } from '../components/ui/Sidebar.tsx';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const AppLayout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(256); // 256px = 16rem (w-64 default)
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = e.clientX;
    if (newWidth > 150 && newWidth < 300) {
      // Min 150px, Max 800px
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        style={{ width: `${sidebarWidth}px`, minWidth: '150px' }}
        className="flex-shrink-0"
      >
        <Sidebar />
      </div>
      <div
        className="w-1 flex-shrink-0 cursor-col-resize bg-gray-200 hover:bg-blue-500 active:bg-blue-700"
        onMouseDown={handleMouseDown}
        style={{ userSelect: 'none' }}
      />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
