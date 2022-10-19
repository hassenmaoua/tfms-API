require('./config/database').connect();
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = require('./app');

app.listen(port, () => {
  console.log('You can use lathe-mill-workshop API in your APP.\n');
});
