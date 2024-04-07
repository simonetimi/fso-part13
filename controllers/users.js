const express = require('express');
const { User } = require('../models');
const { Blog } = require('../models');

const router = express.Router();

// get all Users endpoint
router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] },
        },
    });
    res.json(users);
});

// get one User
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
    }
});

// post User endpoint
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
        });
        if (user) {
            user.username = req.body.username;
            await user.save();
            res.status(200).end();
        } else {
            const error = { name: 'NotFound' };
            next(error);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
