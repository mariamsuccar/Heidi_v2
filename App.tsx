import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatArea from './ChatArea';
import InputArea from './InputArea';
import { Tab, Message } from './types';
import { sendMessageToHeidi } from './geminiService';
import { v4 as uuidv4 } from 'uuid'; // We'll implement a simple ID generator instead of uuid lib to avoid complex deps if possible, but standard practice is uuid. I'll use simple math random for simplicity in this generated file without npm install.

const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.NOTE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToHeidi(messages, text);
      
      const aiMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <Header />
        
        {/* Tabs */}
        <div className="px-6 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex gap-6">
            {Object.values(Tab).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 relative">
            {/* The main content area changes based on tabs, but here we focus on the Chat/Note interface as requested */}
            {activeTab === Tab.NOTE ? (
                 <>
                    <ChatArea messages={messages} isLoading={isLoading} />
                    <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
                 </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                    {activeTab} view not implemented in this demo.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
