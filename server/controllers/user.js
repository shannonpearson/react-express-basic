import bcrypt from 'bcrypt';
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

const { User } = require('../models');

// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Username not found.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Password is incorrect. '});
//       }
//       return done(null, user);
//     });
//   },
// ));

// stuff below here works

const authenticate = (req, res) => User
  // search for user in database
  .findOne({ where: { username: req.body.username.toLowerCase() } })
// if user found in database,
  .then((user) => {
    // if SIGNUP request, return error
    if (req.body.authRequestType === 'signup') {
      res.status(400).send({ message: 'Username already exists!' });
    } else { // if LOGIN request, check hashed password match
      bcrypt.compare(req.body.password, user.dataValues.password, (err, response) => {
        if (err || !response) {
          res.status(401).send(err);
        } else {
          res.status(200).send(response);
        }
      });
    }
  })
// else (if user not found),
  .catch((e) => {
    // if LOGIN request, send error
    if (req.body.authRequestType === 'login') {
      res.status(400).send({ message: 'Username not found!' });
    } else { // if SIGNUP request, create new user
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
          .then((user) => {
            res.status(201).send(user);
          })
          .catch(er => res.status(400).send(er));
      });
    }
    res.status(400).send(e);
  });


module.exports = {
  // create,
  authenticate,
};
