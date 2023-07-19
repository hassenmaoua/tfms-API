const mongoose = require('mongoose');
const config = require('./config');
const { URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to database');
      config.initializeDatabase();
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};
