const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); 
const { Sequelize } = require('sequelize');


const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión:', err.message);
    } else {
        console.log(' Conexión a la base de datos exitosa!');
        connection.release();
    }
});

module.exports = pool;
