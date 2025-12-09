const Task = require('../models/taskModel');

async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTask(req, res) {
    try {
        const { idEmployee, idProject, taskName } = req.body;
        const newTask = await Task.create({ idEmployee, idProject, taskName });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { idEmployee, idProject, taskName } = req.body;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.update({ idEmployee, idProject, taskName });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};