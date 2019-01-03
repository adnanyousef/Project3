const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');

// Express set up
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to db
require('./models');

app.get('/', (req, res) => {
  console.log('main route');
  res.send('main route lol');
});

app.use('/api/auth', require('./routes/auth'));

module.exports = app;
