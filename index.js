require('dotenv').config();

const app = require('./app');

const { API_PORT } = process.env;

app.listen(API_PORT, () =>
  console.log(`Server Started at http://127.0.0.1:${API_PORT}`)
);
