const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// local strategy (use email and password, not jwt)
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(
  localOptions,
  (username, password, done) => {
    // verify email/password, call done with user if it is correct match
    // otherwise, call done with false
    User.findOne({ username })
      .then(user => {
        // if no user found
        if (!user) {
          return done(null, false);
        }

        // compare passwords
        user.comparePassword(password, function(err, isMatch) {
          if (err) return done(err);
          if (!isMatch) return done(null, false);
          return done(null, user);
        });
      })
      // if error in db search
      .catch(err => {
        return done(err);
      });
  }
);

// set up options for JWT srategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret'
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // see if the user ID in the payload exists in our db
  // if it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

exports.authenticate = passport.authenticate('jwt', { session: false });
exports.localSignin = passport.authenticate('local', { session: false });
