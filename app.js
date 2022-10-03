require('./config/database').connect();

const express = require('express');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const oneDay = 1000 * 60 * 60 * 24;
const { TOKEN_KEY } = process.env;

const cors = require('cors');

const whitelist = require('./config/allowedOrigins');

const app = express();

app.use(
  session({
    secret: TOKEN_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// *********************** Logic goes here

const authRouter = require('./routes/authorization');
app.use('/', authRouter);

const clientRouter = require('./routes/client');
app.use('/client', clientRouter);

const produitRouter = require('./routes/produit');
app.use('/produit', produitRouter);

const documentRouter = require('./routes/document');
app.use('/document', documentRouter);

const etatRouter = require('./routes/etat');
app.use('/etat', etatRouter);

// ************************

module.exports = app;
