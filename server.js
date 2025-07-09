const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;
const PROJECTS_FILE = path.join(__dirname, 'projects.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize projects file if it doesn't exist
const initializeProjectsFile = async () => {
  try {
    await fs.access(PROJECTS_FILE);
  } catch (error) {
    // File doesn't exist, create it with empty array
    await fs.writeFile(PROJECTS_FILE, JSON.stringify([], null, 2));
  }
};

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to read projects' });
  }
});

// Add a new project
app.post('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    const projects = JSON.parse(data);
    
    const newProject = {
      ...req.body,
      id: Date.now().toString()
    };
    
    projects.push(newProject);
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Update a project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    const projects = JSON.parse(data);
    
    const projectIndex = projects.findIndex(p => p.id === req.params.id);
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    projects[projectIndex] = { ...req.body, id: req.params.id };
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    
    res.json(projects[projectIndex]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete a project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    const projects = JSON.parse(data);
    
    const filteredProjects = projects.filter(p => p.id !== req.params.id);
    if (filteredProjects.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(filteredProjects, null, 2));
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Start server
const startServer = async () => {
  await initializeProjectsFile();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();