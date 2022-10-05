const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const whitelist = require('./config/allowedOrigins');
const oneDay = 1000 * 60 * 60 * 24;

const { TOKEN_KEY } = process.env;
const { API_PORT } = process.env;

const app = express();

app.listen(API_PORT, () =>
  console.log(`Server Started at http://127.0.0.1:${API_PORT}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    secret: TOKEN_KEY,
    saveUninitialized: true,
    resave: true,
  })
);

// *********************** Logic goes here

const uploadRouter = require('./routes/upload');
app.use('/api/public', uploadRouter);

const authRouter = require('./routes/authorization');
app.use('/api', authRouter);

const clientRouter = require('./routes/client');
app.use('/api/client', clientRouter);

const produitRouter = require('./routes/produit');
app.use('/api/produit', produitRouter);

const documentRouter = require('./routes/document');
app.use('/api/document', documentRouter);

const etatRouter = require('./routes/etat');
app.use('/api/etat', etatRouter);

// ************************

module.exports = app;
