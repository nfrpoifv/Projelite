const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    username: {
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
    tableName: 'USERS',
    timestamps: false
});

module.exports = User;
