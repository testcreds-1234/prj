import React from 'react';
import { Users, Search, Plus } from 'lucide-react';

interface HeaderProps {
  onAddProject: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddProject, searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none text-sm placeholder-gray-400 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddProject}
              className="bg-[#CA2420] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#B01E1B] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#CA2420] rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Team Logo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;