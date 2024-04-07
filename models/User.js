const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/db');

// model
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'user',
    },
);

module.exports = User;
