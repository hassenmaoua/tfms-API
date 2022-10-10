const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

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

// ************************ Logic goes here

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
