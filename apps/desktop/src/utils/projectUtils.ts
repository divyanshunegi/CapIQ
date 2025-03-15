import { nanoid } from 'nanoid';
import { basename } from '@tauri-apps/api/path';

export const generateProjectId = () => nanoid(10);

export const sanitizeProjectName = (name: string) => {
  // Remove special characters and trim
  return name.replace(/[^a-zA-Z0-9-_ ]/g, '').trim();
};

export const getDefaultProjectName = async (files: File[]) => {
  if (files.length === 0) return 'New Project';

  // Try to get a meaningful name from the first file or its parent directory
  const firstFile = files[0];
  const fileName = firstFile.name;

  // If it's a directory, use its name
  if (firstFile.webkitRelativePath) {
    const rootDir = firstFile.webkitRelativePath.split('/')[0];
    return sanitizeProjectName(rootDir);
  }

  // Otherwise, use the file name without extension
  const baseName = await basename(fileName);
  return sanitizeProjectName(baseName.split('.')[0]);
};
