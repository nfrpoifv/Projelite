const Task = require('../models/taskModel');

async function createTask(req, res) {
    try {
        const task = await Task.create({
            ...req.body,
            idUser: req.user.userId  
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            where: { idUser: req.user.userId } 
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTask(req, res) {
    try {
        const task = await Task.findOne({
            where: { 
                id: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const task = await Task.findOne({
            where: { 
                id: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        delete req.body.idUser; 
        await task.update(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const task = await Task.findOne({
            where: { 
                id: req.params.id,
                idUser: req.user.userId  
            }
        });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.destroy();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasksByProject(req, res) {
    try {
        const { projectId } = req.params;
        
        const tasks = await Task.findAll({
            where: { 
                idProject: projectId,
                idUser: req.user.userId  
            }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    listTasks,
    getTask,
    updateTask,
    deleteTask,
    getTasksByProject
};
