import { useState } from 'react';
import { FolderIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CreateProjectDialog } from './CreateProjectDialog';
import { useProjectCreation } from '@/hooks/useProjectCreation';

export const DropZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    isDialogOpen,
    setIsDialogOpen,
    fileCount,
    defaultProjectName,
    handleFileSelection,
    handleProjectCreation,
    processFiles,
    isCreating,
    error,
  } = useProjectCreation();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  return (
    <>
      <motion.div
        className={`flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
        }}
      >
        <FolderIcon className="h-16 w-16 text-blue-500" />
        <h3 className="mt-4 text-xl font-bold text-gray-900">
          Drop your footage here
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          or click to browse your files
        </p>
        <Button variant="secondary" onClick={handleFileSelection}>
          Browse Files
        </Button>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </motion.div>

      <CreateProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleProjectCreation}
        defaultName={defaultProjectName}
        fileCount={fileCount}
        isCreating={isCreating}
        error={error}
      />
    </>
  );
};
