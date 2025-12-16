const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connection successfully'))
    .catch(err => console.error('Connection error: ', err.message));

module.exports = sequelize;
