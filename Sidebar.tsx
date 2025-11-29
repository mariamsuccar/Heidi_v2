import React from 'react';
import { 
  PlusCircle, 
  LayoutList, 
  CheckSquare, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle,
  Zap,
  MessageSquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0 text-sm">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium text-sm">
          MS
        </div>
        <div className="overflow-hidden">
          <div className="font-medium text-gray-900 truncate">Mariam Succar</div>
          <div className="text-xs text-gray-500 truncate">mariam.succar@example.com</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        <div className="px-3 py-2 mx-2 bg-indigo-50 text-indigo-700 rounded-md font-medium flex items-center gap-3 cursor-pointer">
          <PlusCircle size={18} />
          <span>New session</span>
        </div>
        
        <div className="px-3 py-2 mx-2 text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-3 cursor-pointer">
          <LayoutList size={18} />
          <span>View sessions</span>
        </div>
        
        <div className="px-3 py-2 mx-2 text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-3 cursor-pointer">
          <CheckSquare size={18} />
          <span>Tasks</span>
        </div>

        <div className="mt-6 px-5 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Templates
        </div>
        
        <div className="px-3 py-2 mx-2 text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-3 cursor-pointer">
          <Zap size={18} />
          <span>Goldilocks</span>
        </div>
        
        <div className="px-3 py-2 mx-2 text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-3 cursor-pointer">
          <FileText size={18} />
          <span>Template library</span>
        </div>

        <div className="px-3 py-2 mx-2 text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-3 cursor-pointer">
          <Users size={18} />
          <span>Community</span>
        </div>

        <div className="mt-6 px-5 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Team
        </div>
        
        <div className="px-3 py-2 mx-2 text-gray-600 hover:bg-gray-50 rounded-md flex items-center gap-3 cursor-pointer">
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <div className="px-2 py-1.5 text-gray-600 hover:text-gray-900 cursor-pointer text-xs font-medium">Earn $50</div>
        <div className="px-2 py-1.5 text-gray-600 hover:text-gray-900 cursor-pointer text-xs font-medium">Request a feature</div>
        <div className="px-2 py-1.5 text-gray-600 hover:text-gray-900 cursor-pointer text-xs font-medium">Shortcuts</div>
        <div className="px-2 py-1.5 text-gray-600 hover:text-gray-900 cursor-pointer text-xs font-medium flex items-center gap-2">
            <HelpCircle size={14} /> Help
        </div>
      </div>
    </div>
  );
};
