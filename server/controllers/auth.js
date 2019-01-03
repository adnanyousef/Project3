const jwt = require('jwt-simple');
const User = require('../models/User');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      // sub = subject, who the token issued to
      sub: user.id,
      // iat = issued at time
      iat: timestamp
    },
    process.env.JWT_SECRET || 'secret'
  );
}

exports.signin = function(req, res, next) {
  // User already had username/pw auth'd
  // we just need to give them a token
  res.json({
    token: tokenForUser(req.user)
  });
};

exports.signup = function(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide a username and password' });
  }
  User.create({ username, password })
    .then(user =>
      res.json({
        token: tokenForUser(user)
      })
    )
    .catch(err => {
      if (err.code === 11000) {
        return res.status(422).send({ error: 'Username/email in use' });
      }
      return next(err);
    });
};
