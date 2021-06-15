'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Likes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			postId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				onDelete: 'CASCADE',
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				onDelete: 'CASCADE',
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Likes');
	},
};
