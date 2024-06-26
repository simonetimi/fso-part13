require('dotenv').config();
const express = require('express');
const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const authorRouter = require('./controllers/authors');
const readingListRouter = require('./controllers/readingLists');

// Connect to database and run migrations
(async () => {
    await connectToDatabase();
})();

// run server
const app = express();

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// routes
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingListRouter);

// error handler
app.use((err, req, res) => {
    if (err?.name === 'SequelizeValidationError') {
        // Handle validation error
        res?.status(400).json({ error: err?.message });
    } else if (err?.name === 'SequelizeUniqueConstraintError') {
        // Handle unique constraint error
        res?.status(400).json({ error: 'Duplicate entry' });
    } else {
        // Handle general error
        res?.status(500).json({ error: 'An error occurred' });
    }
});
