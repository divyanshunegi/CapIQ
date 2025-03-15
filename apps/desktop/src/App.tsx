import { useEffect } from 'react';
import AppRouter from '@/routes';
import { useDatabaseStore } from '@/stores/databaseStore';

function App() {
  const { initializeDatabase, error } = useDatabaseStore();

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  if (error) {
    // You might want to show a more user-friendly error UI
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-4">
          <h3 className="text-lg font-medium text-red-800">Database Error</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return <AppRouter />;
}

export default App;
