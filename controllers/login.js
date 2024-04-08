const express = require('express');
const { User } = require('../models');
const { Session } = require('../models');
const { tokenCreator } = require('../utils/tokenManager');

const router = express.Router();

// hard-coded password for every user
const pass = 'secret';

// login
router.post('/', async (req, res, next) => {
    if (req.body.password !== pass) {
        return res.status(401).send('Password is invalid');
    }
    const username = req.body.username;
    try {
        const foundUser = await User.findOne({
            where: { username },
        });
        if (!foundUser) {
            res.status(404).send('User not found');
        }
        const user = {
            username,
            id: foundUser.id,
        };
        const token = tokenCreator(user);
        // store session in db
        await Session.create({ token, userId: user.id });
        return res.status(200).send({ token, user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
