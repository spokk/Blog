const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const checkAuth = require('../../middleware/check-auth');

//Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route GET api/users
// @desc Tests users route
// @access Public
router.get('/test', checkAuth, (req, res) => res.json({ response: 'users works' }));

// @route GET api/users/search/users?=query
// @desc Search users route
// @access Public
router.get('/search/users', (req, res) => {
  User.find({ $text: { $search: req.query.query } })
    .limit(10)
    .then(response => {
      console.log(response);
      if (response.length === 0) {
        return res.status(404).json({ search: 'Nothing ... try something else' });
      }
      res.json({ ...response });
    })
    .catch(err => res.status(404).json({ search: 'Something went wrong ... ' }));
});

// @route GET api/users/search?=query
// @desc Search posts route
// @access Public
router.get('/search/posts', (req, res) => {
  Post.find({ $text: { $search: req.query.query } })
    .limit(10)
    .populate('user')
    .then(response => {
      console.log(response);
      if (response.length === 0) {
        return res.status(404).json({ search: 'Nothing ... try something else' });
      }
      res.json({ ...response });
    })
    .catch(err => res.status(404).json({ search: 'Something went wrong ... ' }));
});

// @route POST api/users/register
// @desc Register users
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login User / returning JWT
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, email: user.email }; //JWT payload

        // Sign Token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1d' }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

// @route GET api/users/users
// @desc Return all users
// @access Private
router.get('/users', checkAuth, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

module.exports = router;
