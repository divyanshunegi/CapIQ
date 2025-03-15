import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useCallback, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
  className = '',
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimeout = useState<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      // Clear existing timeout
      if (debounceTimeout[0]) {
        clearTimeout(debounceTimeout[0]);
      }

      // Set new timeout
      debounceTimeout[1](
        setTimeout(() => {
          onChange(newValue);
        }, debounceMs),
      );
    },
    [onChange, debounceMs, debounceTimeout],
  );

  return (
    <div className="relative">
      <MagnifyingGlassIcon
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        role="searchbox"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-lg bg-neutral-700 py-2 pl-10 pr-4 text-sm text-gray-200 
          placeholder-gray-400 transition-colors duration-200 focus:outline-none
          focus:ring-2 focus:ring-blue-500 ${className}`}
        aria-label={placeholder}
      />
    </div>
  );
};
