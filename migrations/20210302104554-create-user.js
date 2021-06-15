'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
				onDelete: 'CASCADE',
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
				onDelete: 'CASCADE',
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
				onDelete: 'CASCADE',
			},
			bio: {
				allowNull: true,
				type: Sequelize.STRING,
				onDelete: 'CASCADE',
			},
			pictureUrl: {
				allowNull: true,
				type: Sequelize.STRING,
				defaultValue: './uploads/profil/random-user.png',
				onDelete: 'CASCADE',
			},
			isAdmin: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('Users');
	},
};
