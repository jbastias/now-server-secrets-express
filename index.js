const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/one', (req, res) => res.send(process.env.ENV_ONE));
app.get('/two', (req, res) => res.send(process.env.ENV_TWO));
app.get('/three', (req, res) => res.send(process.env.ENV_THREE));
app.get('/env', (req, res) => {
  res.json({
    TEST: 'test',
    ENV_ONE: process.env.ENV_ONE,
    ENV_TWO: process.env.ENV_TWO,
    ENV_THREE: process.env.ENV_THREE,
  });
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});