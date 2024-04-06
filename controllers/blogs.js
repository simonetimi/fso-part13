const express = require('express');
const { Blog } = require('../models');

const router = express.Router();

// middleware to get a note
const blogSelector = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};
// get all blogs endpoint
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// get one blog
router.get('/:id', blogSelector, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404);
  }
});

// post blog endpoint
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    /*
        using build + save allows direct editing (like mongoose)
        const note = Blog.build(req.body)
        await note.save()
        */
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:id', blogSelector, async (req, res) => {
  if (req.blog) {
    console.log(req.blog);
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.status(200).end();
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

router.delete('/:id', blogSelector, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
      res.status(204).end();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
