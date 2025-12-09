const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const sequelize = require('./config/database');


app.use(cors());

app.use(express.json());

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/taskRoutes'));
app.use('/', require('./routes/projectRoutes'));
app.use('/', require('./routes/employeeRoutes'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});