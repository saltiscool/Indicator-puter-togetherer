
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, LoadingSpinner } from './icons';

interface CodeOutputProps {
  code: string;
  isLoading: boolean;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ code, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg flex flex-col">
      <div className="px-4 py-2 bg-gray-700/50 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">Combined Script</h2>
        <button
          onClick={handleCopy}
          disabled={!code || copied}
          className="flex items-center gap-2 px-3 py-1 bg-gray-600 text-sm rounded-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-default transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="relative p-1 min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/80 flex flex-col items-center justify-center rounded-b-lg z-10">
            <LoadingSpinner className="h-8 w-8 text-emerald-400" />
            <p className="mt-4 text-gray-300">Generating script...</p>
          </div>
        )}
        <textarea
          value={code}
          readOnly
          placeholder="Your combined Pine Script will appear here..."
          className="w-full h-full min-h-[400px] bg-transparent text-gray-300 font-mono text-sm p-3 resize-none focus:outline-none placeholder-gray-500"
          spellCheck="false"
        />
      </div>
    </div>
  );
};
   
