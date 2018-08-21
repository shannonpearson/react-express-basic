/* eslint consistent-return:0 */

import bcrypt from 'bcrypt';

const passport = require('passport');
const LocalStrategy = require('passport-local');

const { User } = require('../models');


passport.use(new LocalStrategy({
  username: 'username',
  password: 'password',
}, (username, password, done) => {
  User.findOne({ where: { username: username.toLowerCase() } })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      bcrypt.compare(password, user.dataValues.password, (err, response) => {
        if (err || !response) {
          return done(null, false, { message: `Authentication failed. ${err}` });
        }
        return done(null, user);
      });
    }).catch(done);
}));
