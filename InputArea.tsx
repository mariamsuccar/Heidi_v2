import React, { useState, KeyboardEvent } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "Check past medical history",
  "List current medications",
  "Check allergies",
  "Recent pathology results"
];

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      onSendMessage(suggestion);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200">
      {/* Suggestion Chips */}
      <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestionClick(s)}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full transition-colors border border-indigo-100 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={12} className="text-indigo-500" />
            {s}
          </button>
        ))}
      </div>

      <div className="p-4 pt-3">
        <div className="relative flex items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Heidi to check My Health Record…"
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || isLoading}
            className={`absolute right-2 p-1.5 rounded-lg transition-all ${
              text.trim() && !isLoading
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[10px] text-gray-400">
            Review your note before use to ensure it accurately represents the visit
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
