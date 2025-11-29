import React from 'react';
import { ChevronDown, Mic } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div className="flex flex-col">
        <div className="text-gray-900 font-semibold text-base flex items-center gap-2">
          Add patient details
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
          <span>Today 02:57PM</span>
          <span className="text-gray-300">•</span>
          <span>English</span>
          <span className="text-gray-300">•</span>
          <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-[10px] font-medium">14 days</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          Transcribe <ChevronDown size={14} />
        </button>
        <div className="text-gray-400 font-mono text-sm">00:00</div>
        <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            ))}
        </div>
      </div>
    </div>
  );
};
