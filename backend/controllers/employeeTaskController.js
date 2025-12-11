const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

async function getMyTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            where: { idEmployee: req.user.employeeId }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMyProjects(req, res) {
    try {
        const projects = await Project.findAll({
            where: { idEmployee: req.user.employeeId }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMyTask(req, res) {
    try {
        const task = await Task.findOne({
            where: { 
                id: req.params.id,
                idEmployee: req.user.employeeId
            }
        });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found or not assigned to you" });
        }
        
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTaskStatus(req, res) {
    try {
        const { status } = req.body;

        const task = await Task.findOne({
            where: { 
                id: req.params.id,
                idEmployee: req.user.employeeId
            }
        });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found or not assigned to you" });
        }

        await task.update({ status });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMyTasksByProject(req, res) {
    try {
        const { projectId } = req.params;

        const tasks = await Task.findAll({
            where: { 
                idProject: projectId,
                idEmployee: req.user.employeeId
            }
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getMyTasks,
    getMyProjects,
    getMyTask,
    updateTaskStatus,
    getMyTasksByProject
};