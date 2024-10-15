// Create web server and listen on port 3000
// Create a new comment
// Get all comments
// Get a single comment
// Update a comment
// Delete a comment
// module.exports = router;

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { check, validationResult } = require('express-validator');

// Create a new comment
router.post('/comments', [
    check('comment', 'Comment is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('author', 'Author must be a string').isString(),
    check('comment', 'Comment must be a string').isString(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newComment = new Comment({
            comment: req.body.comment
        });
        const comment = await newComment.save();
        res.json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

