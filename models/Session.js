const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/db');

// model
class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'session',
    },
);

module.exports = Session;
