import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value);
  
  // Update internal state when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onChange, value]);
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-white dark:bg-slate-800 w-full py-2 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;