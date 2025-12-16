const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const PORT = 3000;
const FRONTEND_URL = 'http://localhost:8090';

app.use(cors({
  origin: FRONTEND_URL,           
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/', require('./routes/routes'));

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running inside container on http://0.0.0.0:${PORT}`);
      console.log(`Access via host port: http://localhost:8091`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
