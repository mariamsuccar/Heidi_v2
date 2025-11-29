import React, { useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white relative">
        {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50 select-none">
                <p className="text-sm">Connect to MHR to retrieve patient history...</p>
            </div>
        )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${
            msg.role === 'user' ? 'items-end' : 'items-start'
          }`}
        >
            <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }
            `}>
                {msg.content}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.role === 'user' ? 'You' : 'Heidi Assist'}
            </span>
        </div>
      ))}

      {isLoading && (
        <div className="flex flex-col items-start">
           <div className="max-w-[85%] rounded-lg p-3 text-sm leading-relaxed shadow-sm bg-white text-gray-800 border border-gray-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
           </div>
           <span className="text-[10px] text-gray-400 mt-1 px-1">
                Querying My Health Record...
            </span>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatArea;
