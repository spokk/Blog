const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// Validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ response: 'Posts works' }));

// @route GET api/posts
// @desc Get all posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ posts: 'Posts not found' }));
});

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
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ post: 'Post not found' }));
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete('/:id', checkAuth, (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ post: 'No authorized' });
        }

        // Delete post
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ post: 'Post not found' }));
  });
});

// @route POST api/posts/like/:id
// @desc Like post by id
// @access Private
router.post('/like/:id', checkAuth, (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ like: 'User already liked this post' });
        }

        // Add user id to likes array
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: 'Post not found' }));
  });
});

module.exports = router;
