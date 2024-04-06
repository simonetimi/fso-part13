require("dotenv").config();
const express = require("express");

const Blog = require("./models/Blog.js");

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  const blogs = await Blog.findAll({ raw: true });
  console.log(blogs);
});
