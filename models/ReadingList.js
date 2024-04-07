const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/db');

// model
class ReadingList extends Model {}

ReadingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blogs', key: 'id' },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'readingList',
    },
);

module.exports = ReadingList;
