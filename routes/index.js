import express from 'express';
import passport from 'passport';
// import bcrypt from 'bcrypt';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { Strategy as FacebookStrategy } from 'passport-facebook';

/* eslint-disable */
const userController = require('../server/controllers').user;
require('../server/config/passport');

const router = express.Router();

const FACEBOOK_APP_ID = '2307313366162654';
const FACEBOOK_APP_SECRET = '7c6b410b5e99cddd214f7cdc688c39a2';

const client_id = 'ffd8c34c950b42bb827dfaf5bc58b847';
// const client_secret = '5218d183afdc4c81b0cc5ed082abfde6';
const redirect_uri = 'http://localhost:3000/auth/spotify/callback';
const state_param = "idontknowwhatthisis";

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

router.post('/auth/local', () => {
  console.log('local post')
  passport.authenticate('local', { successRedirect: '/auth/success', failureRedirect: '/auth/failure', failureFlash: false }),
  (req, res) => {
    console.log('callback', res.body);
    res.sendStatus(200);
  }
});


router.get('/login/facebook', (req, res) => {
  const url = `https://www.facebook.com/v3.1/dialog/oauth?
    client_id=${client_id}
    &redirect_uri=${redirect_uri}
    &state=${state_param}`;
  res.status(201).send({ url });
});

router.get('/auth/facebook',
  passport.authenticate('facebook', {failureFlash: true}, (req, res) => {console.log('hi')}), (req, res) => {console.log('hi')});

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/* Login using passport */
router.post('/auth/login', (req, res, next) => {
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

/* Spotify login */
router.get('/auth/spotify',(req,res,next) => {
  passport.authenticate('spotify', {scope: [ 'user-read-email', 'user-read-private', 'user-follow-read', 'user-library-read', 'user-top-read', 'user-read-recently-played'], showDialog: true})(req,res,next)
});

/* Spotify login callback */
router.get('/auth/spotify/callback', (req, res,next) => {
  passport.authenticate('spotify', {failureRedirect: '/auth/failure', successRedirect: '/auth/success'}
  )(req,res,next)
}
);

router.get('/auth/failure', (req, res) => {
  console.log('** Failure login route **');
  res.status(202).send({ message: 'auth failure'} );
});

router.get('/auth/success', (req, res) => {
  console.log('** Success login route **');
  res.status(202).send({ message: 'auth success' });
});

router.get('/home', (req, res) => {
  console.log('home');
  res.sendStatus(201);
});

/* GET home page */
router.get('*', (req, res) => {
  console.log('heyo');
  res.render('index.html');
});

export default router;
