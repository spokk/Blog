const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ response: 'Posts works' }));

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', checkAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.body.id
  });

  newPost.save().then(post => res.json(post));
});

module.exports = router;
