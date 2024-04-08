const { Session } = require('../models');

const checkSessionValidity = async (userId, token) => {
    console.log(token);
    const session = await Session.findOne({ where: { userId, token } });
    if (!session) {
        throw new Error('Session not found! Please login');
    }
};

module.exports = checkSessionValidity;
