const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'USERNAME'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PASSWORD'
    }
}, {
    tableName: 'users',       
});

module.exports = User;
