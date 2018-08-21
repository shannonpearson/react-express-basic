import express from 'express';
import passport from 'passport';
/* eslint-disable */
const userController = require('../server/controllers').user;
require('../server/config/passport');

const router = express.Router();

/* GET home page */
router.post('/signup', userController.authenticate);

const next = () => { console.log('NEXT!' )};

// router.post('/login', userController.authenticate);
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
      console.log('passport error')
      res.status(401).send({ message: `Authentication error. ${err}`});
    }
    if (passportUser) {
      console.log('logged in!')
      res.status(201).send({ user: passportUser });
    }
  })(req, res, next);
});

router.get('*', (req, res) => {
  console.log('heyo');
  res.render('index');
});

export default router;
