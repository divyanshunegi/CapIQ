import React from 'react';
import { FiImage, FiVideo, FiStar, FiTag } from 'react-icons/fi';

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

interface MediaGridProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ items, onItemClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
          onClick={() => onItemClick(item)}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          {item.type === 'video' && (
            <div className="absolute right-2 top-2 rounded-full bg-black/50 p-1">
              <FiVideo className="h-4 w-4 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-sm font-medium text-white">{item.title}</h3>
              <div className="mt-1 flex items-center space-x-2">
                {item.favorite && (
                  <FiStar className="h-4 w-4 text-yellow-400" />
                )}
                {item.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <FiTag className="h-4 w-4 text-gray-300" />
                    <span className="text-xs text-gray-300">
                      {item.tags.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 