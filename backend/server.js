const express = require('express');
const app = express();
const port = process.env.PORT || 8080;


const db = require('./config/database'); 

app.get('/', (req, res) => {
 
  db.getConnection((err, connection) => {
    if (err) {
      console.error(' Error al obtener conexión:', err.message);
      res.send('Error al conectar con la base de datos');
    } else {
      console.log('Conexión a la base de datos exitosa desde /');
      connection.release();
      res.send('IT WORKS and DB connected');
    }
  });
});

app.listen(port, () => {
  console.log(`Listening in port: http://localhost:${port}`);
});
