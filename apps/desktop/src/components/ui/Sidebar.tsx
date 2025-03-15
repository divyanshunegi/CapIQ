import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderPlusIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Button } from './Button';
import { ProjectList } from './ProjectList';
import { SearchInput } from './SearchInput';
import { CreateProjectDialog } from '../media/CreateProjectDialog';
import { useProjectCreation } from '@/hooks/useProjectCreation';

// Memoized header component
const SidebarHeader = memo(() => (
  <div className="flex items-center px-4 py-6">
    <img src="/icon.png" alt="CapIQ" className="h-8 w-8" />
    <h1 className="ml-2 text-xl font-bold">CapIQ</h1>
  </div>
));
SidebarHeader.displayName = 'SidebarHeader';

// Memoized settings button component
const SettingsButton = memo(({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-800"
  >
    <Cog6ToothIcon className="mr-2 h-5 w-5" />
    Settings
  </button>
));
SettingsButton.displayName = 'SettingsButton';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    isDialogOpen,
    setIsDialogOpen,
    fileCount,
    defaultProjectName,
    handleFileSelection,
    handleProjectCreation,
    isCreating,
    error,
  } = useProjectCreation();

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const toggleProjects = useCallback(() => {
    setIsProjectsExpanded((prev) => !prev);
  }, []);

  const navigateToSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  return (
    <aside className="h-full bg-[#1C1C1E] text-white" role="complementary">
      <div className="flex h-full flex-col">
        <SidebarHeader />

        {/* Search */}
        <div className="px-4">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search projects by name..."
          />
        </div>

        {/* Import Button */}
        <div className="mx-4 mt-6">
          <Button
            icon={<FolderPlusIcon className="h-5 w-5" />}
            onClick={handleFileSelection}
          >
            Import Footage
          </Button>
        </div>

        {/* Projects Section */}
        <div className="mt-8 flex-1 overflow-hidden">
          <div className="px-4">
            <button
              className="flex w-full cursor-pointer items-center"
              onClick={toggleProjects}
              aria-expanded={isProjectsExpanded}
              aria-controls="projectsList"
            >
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${
                  isProjectsExpanded ? 'rotate-0' : '-rotate-90'
                }`}
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-semibold">Projects</span>
            </button>
          </div>

          {/* Project List */}
          {isProjectsExpanded && (
            <div
              id="projectsList"
              className="mt-2 overflow-y-auto px-4 transition-all duration-200"
            >
              <ProjectList searchQuery={searchQuery} />
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="mt-auto border-t border-gray-800 p-4">
          <SettingsButton onClick={navigateToSettings} />
        </div>
      </div>

      <CreateProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleProjectCreation}
        defaultName={defaultProjectName}
        fileCount={fileCount}
        isCreating={isCreating}
        error={error}
      />
    </aside>
  );
};
