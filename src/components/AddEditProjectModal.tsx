import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ChevronDown } from 'lucide-react';
import { Project } from '../types/project';

interface AddEditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project | null;
}

const AddEditProjectModal: React.FC<AddEditProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  project
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    details: '',
    division: '',
    stakeholder: '',
    businessSponsor: [],
    developer: [],
    status: [],
    statusDetails: '',
    nextSteps: '',
    milestoneDate: '',
    gitlabLinks: []
  });

  const [newGitlabLink, setNewGitlabLink] = useState('');
  const [isTBD, setIsTBD] = useState(false);
  const [showBusinessSponsorDropdown, setShowBusinessSponsorDropdown] = useState(false);
  const [showDeveloperDropdown, setShowDeveloperDropdown] = useState(false);
  const [newBusinessSponsor, setNewBusinessSponsor] = useState('');
  const [newDeveloper, setNewDeveloper] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      details: '',
      division: '',
      stakeholder: '',
      businessSponsor: [],
      developer: [],
      status: [],
      statusDetails: '',
      nextSteps: '',
      milestoneDate: '',
      gitlabLinks: []
    });
    setIsTBD(false);
    setNewGitlabLink('');
    setShowBusinessSponsorDropdown(false);
    setShowDeveloperDropdown(false);
    setNewBusinessSponsor('');
    setNewDeveloper('');
    setNewStatus('');
  };

  const [businessSponsorOptions, setBusinessSponsorOptions] = useState(['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson']);
  const [developerOptions, setDeveloperOptions] = useState(['Alice Brown', 'Bob Davis', 'Charlie Evans', 'Diana Lee']);
  const [statusOptions, setStatusOptions] = useState(['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled']);

  useEffect(() => {
    if (project) {
      setFormData(project);
      setIsTBD(project.milestoneDate === 'TBD');
      setShowBusinessSponsorDropdown(false);
      setShowDeveloperDropdown(false);
      setNewBusinessSponsor('');
      setNewDeveloper('');
      setNewStatus('');
    } else {
      resetForm();
    }
  }, [project, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...(project?.id && { id: project.id }),
      name: formData.name || '',
      details: formData.details || '',
      division: formData.division || '',
      stakeholder: formData.stakeholder || '',
      businessSponsor: formData.businessSponsor || [],
      developer: formData.developer || [],
      status: formData.status || [],
      statusDetails: formData.statusDetails || '',
      nextSteps: formData.nextSteps || '',
      milestoneDate: isTBD ? 'TBD' : (formData.milestoneDate || ''),
      gitlabLinks: formData.gitlabLinks || []
    };
    
    onSave(projectData as Project);
  };

  const handleBusinessSponsorToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      businessSponsor: prev.businessSponsor?.includes(value)
        ? prev.businessSponsor.filter(item => item !== value)
        : [...(prev.businessSponsor || []), value]
    }));
  };

  const addNewBusinessSponsor = () => {
    if (newBusinessSponsor.trim() && !businessSponsorOptions.includes(newBusinessSponsor.trim())) {
      setBusinessSponsorOptions(prev => [...prev, newBusinessSponsor.trim()]);
      handleBusinessSponsorToggle(newBusinessSponsor.trim());
      setNewBusinessSponsor('');
    }
  };

  const addNewDeveloper = () => {
    if (newDeveloper.trim() && !developerOptions.includes(newDeveloper.trim())) {
      setDeveloperOptions(prev => [...prev, newDeveloper.trim()]);
      handleDeveloperToggle(newDeveloper.trim());
      setNewDeveloper('');
    }
  };

  const addNewStatus = () => {
    if (newStatus.trim() && !statusOptions.includes(newStatus.trim())) {
      setStatusOptions(prev => [...prev, newStatus.trim()]);
      handleStatusChange(newStatus.trim());
      setNewStatus('');
    }
  };

  const handleDeveloperToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      developer: prev.developer?.includes(value)
        ? prev.developer.filter(item => item !== value)
        : [...(prev.developer || []), value]
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: [value]
    }));
  };

  const addGitlabLink = () => {
    if (newGitlabLink.trim()) {
      setFormData(prev => ({
        ...prev,
        gitlabLinks: [...(prev.gitlabLinks || []), newGitlabLink.trim()]
      }));
      setNewGitlabLink('');
    }
  };

  const removeGitlabLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gitlabLinks: prev.gitlabLinks?.filter((_, i) => i !== index) || []
    }));
  };

  const handleTBDChange = (checked: boolean) => {
    setIsTBD(checked);
    if (checked) {
      setFormData(prev => ({ ...prev, milestoneDate: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Division *
              </label>
              <input
                type="text"
                required
                value={formData.division}
                onChange={(e) => setFormData(prev => ({ ...prev, division: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Details *
            </label>
            <textarea
              required
              rows={3}
              value={formData.details}
              onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stakeholder *
            </label>
            <input
              type="text"
              required
              value={formData.stakeholder}
              onChange={(e) => setFormData(prev => ({ ...prev, stakeholder: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Sponsor Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Sponsor (Multi-select)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowBusinessSponsorDropdown(!showBusinessSponsorDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent bg-white text-left flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">
                    {formData.businessSponsor?.length ? 
                      `${formData.businessSponsor.length} selected` : 
                      'Select business sponsors'
                    }
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {showBusinessSponsorDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="max-h-40 overflow-y-auto">
                      {/* Add new business sponsor section */}
                      <div className="p-2 border-b border-gray-100 bg-gray-50">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newBusinessSponsor}
                            onChange={(e) => setNewBusinessSponsor(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNewBusinessSponsor())}
                            placeholder="Add new business sponsor..."
                            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#CA2420] focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={addNewBusinessSponsor}
                            className="px-2 py-1 bg-[#CA2420] text-white rounded text-xs hover:bg-[#B01E1B] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {businessSponsorOptions.map(option => (
                        <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.businessSponsor?.includes(option) || false}
                            onChange={() => handleBusinessSponsorToggle(option)}
                            className="rounded border-gray-300 text-[#CA2420] focus:ring-[#CA2420] mr-2"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {formData.businessSponsor?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.businessSponsor.map((sponsor, index) => (
                    <span key={index} className="px-2 py-1 bg-[#B9B9B9] text-white rounded-full text-xs flex items-center">
                      {sponsor}
                      <button
                        type="button"
                        onClick={() => handleBusinessSponsorToggle(sponsor)}
                        className="ml-1 hover:bg-gray-600 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Developer Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Developer (Multi-select)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDeveloperDropdown(!showDeveloperDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent bg-white text-left flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">
                    {formData.developer?.length ? 
                      `${formData.developer.length} selected` : 
                      'Select developers'
                    }
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {showDeveloperDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="max-h-40 overflow-y-auto">
                      {/* Add new developer section */}
                      <div className="p-2 border-b border-gray-100 bg-gray-50">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newDeveloper}
                            onChange={(e) => setNewDeveloper(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNewDeveloper())}
                            placeholder="Add new developer..."
                            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#CA2420] focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={addNewDeveloper}
                            className="px-2 py-1 bg-[#CA2420] text-white rounded text-xs hover:bg-[#B01E1B] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {developerOptions.map(option => (
                        <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.developer?.includes(option) || false}
                            onChange={() => handleDeveloperToggle(option)}
                            className="rounded border-gray-300 text-[#CA2420] focus:ring-[#CA2420] mr-2"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {formData.developer?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.developer.map((dev, index) => (
                    <span key={index} className="px-2 py-1 bg-[#CA2420] text-white rounded-full text-xs flex items-center">
                      {dev}
                      <button
                        type="button"
                        onClick={() => handleDeveloperToggle(dev)}
                        className="ml-1 hover:bg-red-700 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status Dropdown - Single Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status (Single select)
            </label>
            
            <select
              value={formData.status?.[0] || ''}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
            >
              <option value="">Select status</option>
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              <option value="Other">Other</option>
            </select>
            
            {formData.status?.[0] === 'Other' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNewStatus())}
                  placeholder="Enter custom status..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addNewStatus}
                  className="mt-2 px-4 py-2 bg-[#CA2420] text-white rounded-lg hover:bg-[#B01E1B] transition-colors text-sm"
                >
                  Add Status
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Details
              </label>
              <textarea
                rows={2}
                value={formData.statusDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, statusDetails: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Steps
              </label>
              <textarea
                rows={2}
                value={formData.nextSteps}
                onChange={(e) => setFormData(prev => ({ ...prev, nextSteps: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
              />
            </div>
          </div>

          {/* Milestone Date with TBD Checkbox */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Milestone Date
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isTBD}
                  onChange={(e) => handleTBDChange(e.target.checked)}
                  className="rounded border-gray-300 text-[#CA2420] focus:ring-[#CA2420]"
                />
                <span className="text-sm text-gray-700">To Be Decided (TBD)</span>
              </label>
              {!isTBD && (
                <input
                  type="date"
                  value={formData.milestoneDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, milestoneDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitLab Links
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="url"
                value={newGitlabLink}
                onChange={(e) => setNewGitlabLink(e.target.value)}
                placeholder="https://gitlab.com/..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CA2420] focus:border-transparent"
              />
              <button
                type="button"
                onClick={addGitlabLink}
                className="px-4 py-2 bg-[#CA2420] text-white rounded-lg hover:bg-[#B01E1B] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.gitlabLinks?.map((link, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <span className="flex-1 text-sm text-gray-700 truncate">{link}</span>
                  <button
                    type="button"
                    onClick={() => removeGitlabLink(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#CA2420] text-white rounded-lg hover:bg-[#B01E1B] transition-colors"
            >
              {project ? 'Update' : 'Create'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProjectModal;