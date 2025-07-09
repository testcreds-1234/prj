import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import AddEditProjectModal from './components/AddEditProjectModal';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import FilterBar from './components/FilterBar';
import ChatBot from './components/ChatBot';
import { Project } from './types/project';
import { useProjects } from './hooks/useProjects';

const App: React.FC = () => {
  const { projects, loading, error, addProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.stakeholder.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || project.status.includes(statusFilter);
      const matchesDivision = divisionFilter === 'All' || project.division === divisionFilter;

      return matchesSearch && matchesStatus && matchesDivision;
    });
  }, [projects, searchQuery, statusFilter, divisionFilter]);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (editingProject) {
        await updateProject(project);
      } else {
        await addProject(project);
      }
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      // You could add a toast notification here
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
      } catch (error) {
        console.error('Error deleting project:', error);
        // You could add a toast notification here
      }
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('All');
    setDivisionFilter('All');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <Header 
        onAddProject={handleAddProject}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          statusFilter={statusFilter}
          divisionFilter={divisionFilter}
          onStatusFilterChange={setStatusFilter}
          onDivisionFilterChange={setDivisionFilter}
          onClearFilters={handleClearFilters}
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#B9B9B9] rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading projects...</h3>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#B9B9B9] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2 4h2m-2 4h2m-2-8h2m-2 0V3a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || statusFilter !== 'All' || divisionFilter !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first project'
              }
            </p>
            <button
              onClick={handleAddProject}
              className="bg-[#CA2420] text-white px-6 py-3 rounded-lg hover:bg-[#B01E1B] transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}
      </main>
      
      <AddEditProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
      
      <ProjectDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        project={selectedProject}
      />
      
      <ChatBot />
    </div>
  );
};

export default App;