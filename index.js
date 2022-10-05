require('dotenv').config();
require('./config/database').connect();

const app = require('./app');
