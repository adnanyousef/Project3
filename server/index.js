const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');

// Express set up
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  /* const expressGraphQL = require('express-graphql');
  const schema = require('./schema/schema');
  app.use(
    '/graphql',
    expressGraphQL({
      schema,
      graphiql: true
    })
  ); */
}

// Connect to db
require('./models');

app.use('/api/auth', require('./routes/auth'));

module.exports = app;
