const express = require('express');
const { User } = require('../models');
const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

const router = express.Router();

// get all authors
router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'numberOfBlogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'totalLikes'],
        ],
        group: ['author'],
        // double quotes inside regular quotes are necessary to keep the camelcase
        order: [[sequelize.literal('"totalLikes"'), 'DESC']],
    });
    res.json(authors);
});

module.exports = router;
