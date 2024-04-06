require('dotenv').config();
const express = require('express');
const { PORT } = require('./utils/config');

const blogRouter = require('./controllers/blogs');

// run server
const app = express();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// routes
app.use('/api/blogs', blogRouter);
