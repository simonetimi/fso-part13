const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.rawToken = authorization.substring(7);
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch {
            return res.status(401).json({ error: 'token invalid' });
        }
    } else {
        return res.status(401).json({ error: 'token missing' });
    }
    next();
};

const tokenCreator = (user) => {
    return jwt.sign(user, SECRET);
};

module.exports = { tokenExtractor, tokenCreator };
