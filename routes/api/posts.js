const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// Validation
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ response: 'Posts works' }));

// @route GET api/posts
// @desc Get all posts
// @access Public
router.get('/page/:page', (req, res) => {
  let page = parseInt(req.params.page);
  let skip = 6 * (page - 1);
  Post.find()
    .sort({ date: -1 })
    .limit(6)
    .skip(skip)
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
    header: req.body.header,
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route POST api/posts/edit/:id
// @desc Edit post by id
// @access Private
router.post('/edit/:id', checkAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = {
    header: req.body.header,
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  };

  Post.findByIdAndUpdate(req.params.id, { $set: { ...newPost } }, { new: true }, (error, doc) => {
    if (error) {
      return res.status(404).json({ upadte: 'error' });
    }
    return res.status(200).json(doc);
  });
});

// @route GET api/posts/search?query=
// @desc Search posts route
// @access Public
router.get('/search', (req, res) => {
  Post.find({ $text: { $search: req.query.query } })
    .limit(10)
    .then(response => {
      if (response.length === 0) {
        return res.status(404).json({ error: 'Nothing ... try something else' });
      }
      res.json(response);
    })
    .catch(err => res.status(404).json({ error: 'Something went wrong ... ' }));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ error: 'Post not found' }));
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete('/:id', checkAuth, (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ error: 'No authorized' });
        }

        // Delete post
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ error: 'Post not found' }));
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

// @route POST api/posts/unlike/:id
// @desc Unlike post by id
// @access Private
router.post('/unlike/:id', checkAuth, (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ like: 'You have not liked this post yet' });
        }

        //Get remove index
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

        //Splice out of array
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => {
        res.status(404).json({ post: 'Post not found' });
      });
  });
});

// @route POST api/posts/comment/:id
// @desc Add comment to post by id
// @access Private
router.post('/comment/:id', checkAuth, (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      };

      //Add comment to comments array
      post.comments.unshift(newComment);

      //Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ post: 'Post not found' }));
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment from post by id
// @access Private
router.delete('/comment/:id/:comment_id', checkAuth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      //Check if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ comment: 'Comment not found' });
      }

      post.comments.map(comment => {
        if (comment.user.toString() === req.user.id && comment._id.toString() === req.params.comment_id) {
          // Get remove index
          const removeIndex = post.comments
            .map(comment => comment._id.toString())
            .indexOf(req.params.comment_id);

          // Delete comment from array
          post.comments.splice(removeIndex, 1);

          //Save
          return post.save().then(post => {
            return res.json(post);
          });
        }
      });
    })
    .catch(err => res.status(404).json({ post: 'Comment not found' }));
});

module.exports = router;
