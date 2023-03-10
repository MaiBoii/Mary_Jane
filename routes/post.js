const express = require('express');
const router = express.Router();
const { create, show } = require('../controllers/postController');
const { isLoggedIn } = require('./logged');

// Show the form for creating a new post
router.get('/write', isLoggedIn, (req, res) => {
  res.render('new-post');
});

// Create a new post
router.post('/', isLoggedIn, create);

// Show an individual post
router.get('/:id', show);

module.exports = router;
