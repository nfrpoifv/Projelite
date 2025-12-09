const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EMPLOYEE = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'IDEMPLOYEE'
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

module.exports = EMPLOYEE;
