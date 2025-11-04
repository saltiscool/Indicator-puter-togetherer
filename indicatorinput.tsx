
import React from 'react';

interface IndicatorInputProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export const IndicatorInput: React.FC<IndicatorInputProps> = ({ title, value, onChange, placeholder }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg flex flex-col h-full">
      <div className="px-4 py-2 bg-gray-700/50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-full min-h-[300px] bg-transparent text-gray-300 font-mono text-sm p-3 resize-none focus:outline-none placeholder-gray-500"
          spellCheck="false"
        />
      </div>
    </div>
  );
};
