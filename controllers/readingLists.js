const express = require('express');
const { ReadingList } = require('../models');
const { tokenExtractor } = require('../utils/tokenManager');
const checkSessionValidity = require('../utils/sessionManager');

const router = express.Router();

// get all Users endpoint
router.get('/', async (req, res) => {
    const users = await ReadingList.findAll({
        attributes: { exclude: ['read'] },
    });
    res.json(users);
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const match = await ReadingList.findByPk(req.params.id);
        const userId = req.decodedToken.id;
        await checkSessionValidity(userId, req.rawToken);
        if (userId !== match.userId) {
            return res
                .status(401)
                .send('You must be the owner of the blog to mark it as read');
        }
        match.read = req.body.read;
        await match.save();
        return res.status(200).send('Blog marked successfully');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
