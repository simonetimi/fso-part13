const express = require('express');
const { Session } = require('../models');
const { tokenExtractor } = require('../utils/tokenManager');

const router = express.Router();

router.delete('/', tokenExtractor, async (req, res, next) => {
    try {
        const userId = req.decodedToken.id;
        const token = req.rawToken;
        await Session.destroy({ where: { userId, token } });
        res.status(200).send('Logged out successfully!');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
