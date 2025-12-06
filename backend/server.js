const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('IT WORKS');
});

app.listen(port, () => {
  console.log(`Listening in port: http://localhost:${port}`);
});
