import React from 'react';
import { FiFilter, FiArrowDown, FiGrid, FiList } from 'react-icons/fi';
import { MediaGrid } from '../components/MediaGrid';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  title: string;
  tags: string[];
  favorite: boolean;
  metadata: {
    date: string;
    size: string;
    dimensions?: string;
    duration?: string;
  };
}

// Sample data - in a real app, this would come from your backend
const sampleItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    thumbnail: 'https://picsum.photos/400/400',
    title: 'Sample Photo 1',
    tags: ['nature', 'landscape'],
    favorite: true,
    metadata: {
      date: '2024-03-10',
      size: '2.4 MB',
      dimensions: '3000 x 2000',
    },
  },
  {
    id: '2',
    type: 'video',
    thumbnail: 'https://picsum.photos/400/400',
    title: 'Sample Video 1',
    tags: ['travel'],
    favorite: false,
    metadata: {
      date: '2024-03-09',
      size: '24.8 MB',
      duration: '00:02:34',
    },
  },
];

export const MediaLibrary: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [items] = React.useState(sampleItems);

  const handleItemClick = (item: MediaItem) => {
    console.log('Item clicked:', item);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiFilter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="inline-flex items-center space-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <FiArrowDown className="h-4 w-4" />
            <span>Sort</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`rounded-md p-2 ${
              viewMode === 'grid'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid className="h-5 w-5" />
          </button>
          <button
            className={`rounded-md p-2 ${
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            }`}
            onClick={() => setViewMode('list')}
          >
            <FiList className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <MediaGrid items={items} onItemClick={handleItemClick} />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          {/* List view implementation */}
          <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
            List view coming soon...
          </div>
        </div>
      )}
    </div>
  );
}; 