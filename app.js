require('./config/database').connect();

const express = require('express');

const app = express();

app.use(express.json());

// *********************** Logic goes here

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

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
