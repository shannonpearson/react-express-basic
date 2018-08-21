/* eslint consistent-return:0 */

import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const { User } = require('../models');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  User.findOne({ where: { username: username.toLowerCase() } })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      bcrypt.compare(password, user.dataValues.password, (err, response) => {
        if (err || !response) {
          return done(null, false, { message: `Authentication failed, password not a match. ${err}` });
        }
        return done(null, user, { message: 'Logged in bitchez' });
      });
    }).catch(done);
}));


const create = (req, res) => User
  // search for user in database
  .findOne({ where: { username: req.body.username.toLowerCase() } })
  .then((user) => {
    // if user found in database, return error
    if (user) {
      if (req.body.authRequestType === 'signup') {
        res.status(400).send({ message: 'Username already exists!' });
      }
    } else {
      // otherwise create user
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          return res.status(400).send(err);
        }
        return User
          .create({
            username: req.body.username.toLowerCase(),
            password: hash,
          })
          .then((newUser) => {
            res.status(201).send({ message: 'New user created.', newUser });
          })
          .catch(er => res.status(400).send(er));
      });
    }
  })
  .catch((e) => {
    res.status(400).send(e);
  });


module.exports = {
  create,
};
