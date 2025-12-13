const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'IDEMPLOYEE'
    },
    idUser: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'IDUSER'
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'EMAIL'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PASSWORD'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NAME'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'LAST_NAME'
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'ROLE'
    }
}, {
    tableName: 'EMPLOYEE',
    timestamps: false
});

module.exports = Employee;