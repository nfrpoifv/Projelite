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
    name: {                 
        type: DataTypes.STRING,
        allowNull: false,
        field: 'TASK_NAME'
    },
    description: {             
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'DESCRIPTION'
    },
    status: {              
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ESTADO'
    }
}, {
    tableName: 'TASK',
    timestamps: false
});

module.exports = Task;