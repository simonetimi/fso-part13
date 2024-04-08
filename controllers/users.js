const express = require('express');
const { User } = require('../models');
const { Blog } = require('../models');
const { ReadingList } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// get all Users endpoint
router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: ReadingList,
                as: 'readings',
                attributes: { exclude: ['userId', 'blogId'] },
                include: {
                    model: Blog,
                    attributes: [
                        'id',
                        'author',
                        'url',
                        'title',
                        'likes',
                        'year',
                    ],
                },
            },
        ],
    });
    res.json(users);
});

// get one User
router.get('/:id', async (req, res) => {
    const read = req.query.read === 'true';
    let where = {};
    if (req.query.read) {
        const read = req.query.read === 'true';
        where = {
            read: { [Op.eq]: read },
        };
    }
    const user = await User.findByPk(req.params.id, {
        include: [
            {
                model: ReadingList,
                as: 'readings',
                attributes: { exclude: ['userId', 'blogId'] },
                where,
                // required is necessary if no unread or rad blogs are present, otherwise it won't return anything
                required: false,
                include: {
                    model: Blog,
                    attributes: [
                        'id',
                        'author',
                        'url',
                        'title',
                        'likes',
                        'year',
                    ],
                },
            },
        ],
    });
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
