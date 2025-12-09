const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,   
    process.env.USER,       
    process.env.PASSWORD,   
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
);

sequelize.authenticate()
    .then(() => console.log('Database Connection succesfully'))
    .catch(err => console.error('Connection error: ', err.message));

module.exports = sequelize;
