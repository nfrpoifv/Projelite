const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const sequelize = require('./config/database');

app.use(express.json());

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/taskRoutes'));
app.use('/', require('./routes/projectRoutes'));
app.use('/', require('./routes/employeeRoutes'));

// Test connection
sequelize.authenticate()
    .then(() => console.log('Database connection successful!'))
    .catch(err => console.error('Database connection error:', err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
