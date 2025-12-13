const Project = require('../models/projectModel');

async function createProject(req, res) {
    try {
        const project = await Project.create({
            ...req.body,
            idUser: req.user.userId  
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listProjects(req, res) {
    try {
        const projects = await Project.findAll({
            where: { idUser: req.user.userId }  
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProject(req, res) {
    try {
        const project = await Project.findOne({
            where: { 
                id: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProject(req, res) {
    try {
        const project = await Project.findOne({
            where: { 
                id: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        delete req.body.idUser;  
        await project.update(req.body);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findOne({
            where: { 
                id: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.destroy();
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProject,
    listProjects,
    getProject,
    updateProject,
    deleteProject
};