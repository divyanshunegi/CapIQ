import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectModal } from './components/ProjectModal';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const { modalOpen, modalType } = useStore();

  return (
    <MainLayout>
      <ProjectsPage />
      {modalOpen && modalType === 'project' && <ProjectModal />}
    </MainLayout>
  );
};

export default App;
