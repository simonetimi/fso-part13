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

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    // Handle validation error
    res.status(400).json({ error: err.message });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    // Handle unique constraint error
    res.status(400).json({ error: 'Duplicate entry' });
  } else {
    // Handle general error
    res.status(500).json({ error: 'An error occurred' });
  }
});