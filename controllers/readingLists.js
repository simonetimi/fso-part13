const express = require('express');
const { ReadingList } = require('../models');

const router = express.Router();

// get all Users endpoint
router.get('/', async (req, res) => {
    const users = await ReadingList.findAll({
        attributes: { exclude: ['read'] },
    });
    res.json(users);
});

module.exports = router;
