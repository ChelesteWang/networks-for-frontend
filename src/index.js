const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! from GET /');
});

app.post('/', (req, res) => {
  res.send('Hello World! from POST /');
});

app.put('/', (req, res) => {
  res.send('Hello World! from PUT /');
});

app.delete('/', (req, res) => {
  res.send('Hello World! from DELETE /');
});

app.options('/', (req, res) => {
  res.send('Hello World! from OPTIONS /');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});