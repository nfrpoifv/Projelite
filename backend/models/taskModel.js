const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'IDTASK'
    },
    idEmployee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'IDEMPLOYEE'
    },
    idProject: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'IDPROJECT'
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'TASK_NAME'
    }
}, {
    tableName: 'TASK',
    timestamps: false
});

module.exports = Task;