import express from 'express';

const userController = require('../server/controllers').user;

const router = express.Router();

/* GET home page */
router.post('/signup', userController.create);

router.get('*', (req, res) => {
  console.log('heyo');
  res.render('index');
});

export default router;
