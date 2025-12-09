const Project = require('../models/projectModel');

async function getProjects(req, res) {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: error.message });
    }
}

async function getProject(req, res) {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error al obtener proyecto:', error);
        res.status(500).json({ error: error.message });
    }
}

async function createProject(req, res) {
    try {
        const { idEmployee, nameProject } = req.body; 
        const newProject = await Project.create({ idEmployee, nameProject });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        res.status(500).json({ error: error.message });
    }
}

async function updateProject(req, res) {
    try {
        const { id } = req.params;
        const { idEmployee, nameProject } = req.body;
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        await project.update({ idEmployee, nameProject });
        res.json(project);
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteProject(req, res) {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        await project.destroy();
        res.json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};