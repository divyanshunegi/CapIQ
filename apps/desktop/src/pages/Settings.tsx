import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import {
  KeyIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { openUrl } from '@tauri-apps/plugin-opener';
import { useNavigate } from 'react-router-dom';
import { useValidateApiKey } from '@/stores/authStore';

export const Settings = () => {
  const navigate = useNavigate();
  const { apiKey, clearApiKey, setApiKey: updateApiKey } = useAuthStore();
  const validateApiKey = useValidateApiKey();
  const [isClearing, setIsClearing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [newApiKey, setNewApiKey] = useState(apiKey || '');
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleClearApiKey = async () => {
    setIsClearing(true);
    try {
      await clearApiKey();
      setNewApiKey('');
      setShowWarning(true);
    } finally {
      setIsClearing(false);
    }
  };

  const handleOpenUrl = async (url: string) => {
    try {
      await openUrl(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const handleUpdateApiKey = async () => {
    if (!newApiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const isValid = await validateApiKey(newApiKey);
      if (isValid) {
        await updateApiKey(newApiKey);
        setError(null);
        setShowWarning(false);
      } else {
        setError('Invalid API key. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to validate API key. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleProceedWithoutKey = () => {
    setShowWarning(false);
    navigate('/onboarding');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your application settings and preferences
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <KeyIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  API Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure your OpenAI API key for AI-powered features
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                handleOpenUrl('https://platform.openai.com/api-keys')
              }
              className="inline-flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600"
            >
              <span>Get API Key</span>
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OpenAI API Key
              </label>
              <div className="mt-1">
                <div className="relative">
                  <input
                    type="password"
                    value={newApiKey}
                    onChange={(e) => {
                      setNewApiKey(e.target.value);
                      setError(null);
                    }}
                    placeholder="sk-..."
                    className={`block w-full rounded-md border py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <p className="mt-2 text-sm text-gray-500">
                  Your API key is stored locally and never sent to our servers
                </p>
              </div>
            </div>

            {apiKey && (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      API Key Active
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Your API key is currently active. Clearing it will
                        disable AI features until a new key is provided.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleClearApiKey}
                disabled={isClearing || !apiKey}
                className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isClearing ? 'Clearing...' : 'Clear API Key'}
              </button>
              {newApiKey !== apiKey && (
                <button
                  onClick={handleUpdateApiKey}
                  disabled={isValidating || !newApiKey.trim()}
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isValidating ? 'Validating...' : 'Update API Key'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    No API Key Available
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You haven't provided an OpenAI API key. Some features will
                      be disabled. Would you like to proceed without an API key
                      or provide one now?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowWarning(false)}
                >
                  Provide API Key
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                  onClick={handleProceedWithoutKey}
                >
                  Proceed Without Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
