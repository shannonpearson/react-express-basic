import bcrypt from 'bcrypt';

const { User } = require('../models');

module.exports = {
  create(req, res) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return console.log('error in bcrypt.genSalt');
      }
      return bcrypt.hash(req.body.password, salt, (error, hash) => {
        if (error) {
          return console.log('error in bcrypt.hash');
        }
        return User
          .create({
            username: req.body.username,
            password: hash,
          })
          .then(user => res.status(201).send(user))
          .catch(e => res.status(400).send(e));
      });
    });
  },
};
