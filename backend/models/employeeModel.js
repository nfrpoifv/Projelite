const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const EMPLOYEE = sequelize.define('Employee', {
    employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: IDEMPLOYEE
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NAME'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'LAST_NAME'
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'ROLE' 
    }
}, {
    tableName: 'employee',       
});

module.exports = User;
