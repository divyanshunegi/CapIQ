import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiTag, FiSettings, FiImage } from 'react-icons/fi';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: FiHome, label: 'Dashboard', href: '/' },
  { icon: FiFolder, label: 'Libraries', href: '/libraries' },
  { icon: FiImage, label: 'Media', href: '/media' },
  { icon: FiTag, label: 'Tags', href: '/tags' },
  { icon: FiSettings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">CapIQ</h1>
      </div>
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}; 