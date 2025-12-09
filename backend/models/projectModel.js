const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        field: 'IDPROJECT'
    },
    idEmployee: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        field: 'IDEMPLOYEE'
    },
    nameProject: {
        type: DataTypes.STRING,
        allowNull: true, 
        field: 'NAME_PROJECT' 
    }
}, {
    tableName: 'PROJECT',
    timestamps: false
});

module.exports = Project;