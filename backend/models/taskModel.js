const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Employee = require('./Employee');
const Project = require('./Project');

const Task = sequelize.define('Task', {
    taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'IDTASK'
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'employeeId'
        },
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'projectId'
        },
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'TASK_NAME'
    }
}, {
    tableName: 'task',
});

module.exports = Task;
