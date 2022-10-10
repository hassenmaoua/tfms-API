const mongoose = require('mongoose');
const { LOCAL_URI } = process.env;

const uri =
  'mongodb+srv://user:user123@cluster0.0kfdzhh.mongodb.net/?retryWrites=true&w=majority';

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};
