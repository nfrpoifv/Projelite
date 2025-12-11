const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const sequelize = require('./config/database');

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/routes'));

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });