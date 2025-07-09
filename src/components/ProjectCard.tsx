import React from 'react';
import { Calendar, Users, GitBranch, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, onClick }) => {
  const getStatusColor = (status: string[]) => {
    if (status.includes('In Progress')) return 'bg-blue-100 text-blue-800';
    if (status.includes('Completed')) return 'bg-green-100 text-green-800';
    if (status.includes('On Hold')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on menu or menu items
    if ((e.target as HTMLElement).closest('.menu-container')) {
      return;
    }
    onClick(project);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#CA2420] transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {project.details.length > 100 
              ? `${project.details.substring(0, 100)}...` 
              : project.details
            }
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project.status.map((status, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>
        
        <div className="relative group/menu menu-container" onClick={handleMenuClick}>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Division:</span>
          <span className="font-medium">{project.division}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Stakeholder:</span>
          <span className="font-medium">{project.stakeholder}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Business Sponsor:</span>
          <div className="flex flex-wrap gap-1">
            {project.businessSponsor.map((sponsor, index) => (
              <span key={index} className="px-2 py-1 bg-[#B9B9B9] text-white rounded-full text-xs">
                {sponsor}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Developer:</span>
          <div className="flex flex-wrap gap-1">
            {project.developer.map((dev, index) => (
              <span key={index} className="px-2 py-1 bg-[#CA2420] text-white rounded-full text-xs">
                {dev}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{project.milestoneDate}</span>
          </div>
          
          {project.gitlabLinks.length > 0 && (
            <div className="flex items-center space-x-1 text-[#CA2420]">
              <GitBranch className="w-4 h-4" />
              <span>{project.gitlabLinks.length} repo(s)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;