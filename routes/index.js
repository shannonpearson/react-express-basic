import express from 'express';
import passport from 'passport';
/* eslint-disable */
const userController = require('../server/controllers').user;
require('../server/config/passport');

const router = express.Router();

/* Create new user */
router.post('/signup', userController.create);

/* Login using passport */
router.post('/login', (req, res, next) => {
  const { body: { username, password }} = req;
  
  if (!username) {
    return res.status(401).send({ message: 'Username is required, none sent.' });
  }
  if (!password) {
    return res.status(401).send({ message: 'Password is required, none sent.' });
  }
  
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      res.status(401).send({ message: `Passport authentication error. ${err}`});
    }
    if (passportUser) {
      res.status(201).send({ message: 'Logged in via passport!', user: passportUser });
    }
  })(req, res, next);
});

/* GET home page */
router.get('*', (req, res) => {
  console.log('heyo');
  res.render('index');
});

export default router;
