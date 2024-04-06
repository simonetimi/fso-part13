require('dotenv').config();
const express = require('express');

const Blog = require('./models/Blog.js');

// run server
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// get all blogs endpoint
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// get one blog
app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
  }
});

// post blog endpoint
app.post('/api/blogs', async (req, res) => {
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

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    await blog.destroy();
    res.status(200).end();
  } catch (error) {
    return res.status(400).json({ error });
  }
});
