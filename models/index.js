const Blog = require('./Blog');
const User = require('./User');
const ReadingList = require('./ReadingList');
const Session = require('./Session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });

User.hasMany(ReadingList, { foreignKey: 'userId', as: 'readings' });
ReadingList.belongsTo(User, { foreignKey: 'userId' });
ReadingList.belongsTo(Blog, { foreignKey: 'blogId' });

Session.belongsTo(User);
User.hasOne(Session);

module.exports = {
    Blog,
    User,
    ReadingList,
    Session,
};
