require('dotenv').config();
require('./config/database').connect();

const { API_PORT } = process.env;

const app = require('./app');

app.listen(API_PORT, () => {
  console.log('You can use lathe-mill-workshop API in your APP.\n');
  console.log(`\tLocal: http://127.0.0.1:${API_PORT}\n`);
});
