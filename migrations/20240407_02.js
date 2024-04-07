const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('reading_lists', {
            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'blogs', key: 'id' },
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('reading_lists');
    },
};
