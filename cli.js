require('dotenv').config();
const express = require('express');
const { PORT } = require('./utils/config');

const { Blog } = require('./models');

const app = express();

app.listen(PORT, async () => {
  const blogs = await Blog.findAll({ raw: true });
  console.log(blogs);
});
