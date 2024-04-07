const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            author: {
                type: DataTypes.TEXT,
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
        await queryInterface.createTable('users', {
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
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs');
        await queryInterface.dropTable('users');
    },
};
