require('./config/database').connect();

const port = process.env.PORT || 5000;

const app = require('./app');

app.listen(port, () => {
  console.log('You can use lathe-mill-workshop API in your APP.\n');
  console.log(`\tLocal: http://127.0.0.1:${port}\n`);
});
