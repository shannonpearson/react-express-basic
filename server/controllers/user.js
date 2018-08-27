/* eslint consistent-return:0 no-console:0 */

import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// const SpotifyStrategy = require('passport-spotify').Strategy;
import { Strategy as SpotifyStrategy } from 'passport-spotify';

const { User } = require('../models');

/* create user route */
const create = (username, password) => {
  if (!username) {
    console.log('Username required.');
    return null;
  }
  if (!password) {
    console.log('Password required.');
    return null;
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(`Error hashing: ${err}`);
      return { error: 'Hashing error.' };
    }
    return User
      .create({
        username: username.toLowerCase(),
        password: hash,
      })
      .then((newUser) => {
        console.log(`Successfully created new user: ${newUser.dataValues}`);
        return { username };
      })
      .catch((error) => {
        console.log(`Error creating new user: ${err}`);
        return { error };
      });
  });
};

/* login user route */
const login = (username, password, correctPassword, done) => {
  bcrypt.compare(password, correctPassword, (err, response) => {
    if (err || !response) {
      console.log(`Error logging in: ${err}`);
      return done(null, false, { message: `Authentication failed, password not a match. ${err}` });
    }
    console.log(`Successfully logged in user: ${username}`);
    return done(null, { username });
  });
};

/* Passport local strategy */
passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  // find user in database and create or log in
  User.findOne({ where: { username: username.toLowerCase() } })
    .then((user) => {
      if (!user) {
        console.log('no user, creating');
        return create(username.toLowerCase(), password);
      }
      console.log('passed no user condition');
      return login(username, password, user.dataValues.password, done);
    }).catch(done);
}));

/* eslint camelcase:0 */
const client_id = 'ffd8c34c950b42bb827dfaf5bc58b847';
const client_secret = '5218d183afdc4c81b0cc5ed082abfde6';
const redirect_uri = 'http://localhost:3000/auth/spotify/callback';

/* SPOTIFY OAUTH */

passport.use('spotify', new SpotifyStrategy(
  {
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('***finding or creating spotify authentication***');
    process.nextTick(() => {
      User.findOrCreate({
        where: {
          SpotifyId: profile.id,
        },
        defaults: {
          name: profile.displayName,
          SpotifyId: profile.id,
          accessToken,
          refreshToken,
        },
      });
      done(null, profile);
    });
  },
));

module.exports = {
  create,
  login,
};
