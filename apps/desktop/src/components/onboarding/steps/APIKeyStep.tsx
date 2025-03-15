import { useState } from 'react';
import { motion } from 'framer-motion';
import { StepButton } from '../StepButton';
import {
  KeyIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { useValidateApiKey } from '@/stores/authStore';
import { openUrl } from '@tauri-apps/plugin-opener';

interface APIKeyStepProps {
  onSubmit: (apiKey: string) => void;
  onBack: () => void;
}

export const APIKeyStep = ({ onSubmit, onBack }: APIKeyStepProps) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const validateApiKey = useValidateApiKey();

  const handleSubmit = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setError(null);

    try {
      const isValid = await validateApiKey(apiKey);
      if (isValid) {
        onSubmit(apiKey);
      } else {
        setError('Invalid API key. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to validate API key. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleOpenUrl = async (url: string) => {
    try {
      await openUrl(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Connect your OpenAI Account
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your OpenAI API key to enable AI-powered features. Your key is
          stored locally and never sent to our servers.
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            OpenAI API Key
          </label>
          <div className="relative">
            <KeyIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError(null);
              }}
              placeholder="sk-..."
              className={`w-full rounded-lg border py-2.5 pl-12 pr-4 
                       text-gray-900 placeholder-gray-400 focus:outline-none
                       focus:ring-2 focus:ring-blue-500 dark:bg-gray-800/50 
                       dark:text-white
                       ${
                         error
                           ? 'border-red-500'
                           : 'border-gray-200 dark:border-gray-700'
                       }`}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <motion.button
          onClick={() => handleOpenUrl('https://platform.openai.com/api-keys')}
          className="inline-flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600"
          whileHover={{ x: 2 }}
        >
          <span>Get an OpenAI API key</span>
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex justify-between pt-6">
        <StepButton onClick={onBack} variant="secondary">
          Back
        </StepButton>
        <StepButton
          onClick={handleSubmit}
          disabled={!apiKey.trim() || isValidating}
        >
          {isValidating ? 'Validating...' : 'Complete Setup'}
        </StepButton>
      </div>
    </div>
  );
};
