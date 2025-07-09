import React from 'react';
import { X, Calendar, Users, GitBranch, ExternalLink, Building, User, CheckCircle } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  if (!isOpen || !project) return null;

  const getStatusColor = (status: string[]) => {
    if (status.includes('In Progress')) return 'bg-blue-100 text-blue-800';
    if (status.includes('Completed')) return 'bg-green-100 text-green-800';
    if (status.includes('On Hold')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#CA2420] to-[#B01E1B]">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {project.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.status.map((status, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white"
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-[#CA2420]" />
              Project Details
            </h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {project.details}
            </p>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Building className="w-5 h-5 text-[#CA2420] mr-2" />
                  <span className="font-medium text-gray-900">Division</span>
                </div>
                <p className="text-gray-700">{project.division}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 text-[#CA2420] mr-2" />
                  <span className="font-medium text-gray-900">Stakeholder</span>
                </div>
                <p className="text-gray-700">{project.stakeholder}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-[#CA2420] mr-2" />
                  <span className="font-medium text-gray-900">Milestone Date</span>
                </div>
                <p className="text-gray-700">{project.milestoneDate || 'TBD'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-[#CA2420] mr-2" />
                  <span className="font-medium text-gray-900">Business Sponsors</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.businessSponsor.length > 0 ? (
                    project.businessSponsor.map((sponsor, index) => (
                      <span key={index} className="px-3 py-1 bg-[#B9B9B9] text-white rounded-full text-sm">
                        {sponsor}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No business sponsors assigned</span>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-[#CA2420] mr-2" />
                  <span className="font-medium text-gray-900">Developers</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.developer.length > 0 ? (
                    project.developer.map((dev, index) => (
                      <span key={index} className="px-3 py-1 bg-[#CA2420] text-white rounded-full text-sm">
                        {dev}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No developers assigned</span>
                  )}
                </div>
              </div>

              {project.gitlabLinks.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <GitBranch className="w-5 h-5 text-[#CA2420] mr-2" />
                    <span className="font-medium text-gray-900">GitLab Links</span>
                  </div>
                  <div className="space-y-2">
                    {project.gitlabLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#CA2420] hover:text-[#B01E1B] text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span className="truncate">{link}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Details and Next Steps */}
          {(project.statusDetails || project.nextSteps) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.statusDetails && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Details</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{project.statusDetails}</p>
                  </div>
                </div>
              )}

              {project.nextSteps && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{project.nextSteps}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#CA2420] text-white rounded-lg hover:bg-[#B01E1B] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;