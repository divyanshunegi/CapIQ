import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Onboarding } from '@/pages/Onboarding';
import { Settings } from '@/pages/Settings';
import { ProjectDetails } from '@/pages/ProjectDetails';
import { AppLayout } from '@/layouts/AppLayout';
import { useAuthStore } from '@/stores/authStore';

const ProtectedRoute = () => {
  const hasApiKey = useAuthStore((state) => state.apiKey);
  return hasApiKey ? <Outlet /> : <Navigate to="/onboarding" replace />;
};

const PublicRoute = () => {
  const hasApiKey = useAuthStore((state) => state.apiKey);
  return hasApiKey ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="onboarding" element={<PublicRoute />}>
          <Route index element={<Onboarding />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="project/:projectId" element={<ProjectDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
