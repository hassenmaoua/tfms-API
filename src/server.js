require('./config/database').connect();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).sendFile('index.html', { root: 'public' });
});

const authRoutes = require('./routes/userRoutes');
app.use('/api', authRoutes);

const activityRoutes = require('./routes/activityRoutes');
app.use('/api/activities', activityRoutes);

const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);

const stateRoutes = require('./routes/stateRoutes');
app.use('/api/states', stateRoutes);

app.listen(port, () => {
  console.log(
    `You can use TFMS-Solutions API in your APP.\nhttp://localhost:${port}\n`
  );
});
