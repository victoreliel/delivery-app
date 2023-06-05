"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(100),
      },
      price: {
        allowNull: false,
        type: Sequelize.DataTypes.DECIMAL(4, 2),
      },
      urlImage: {
        allowNull: false,
        field: "url_image",
        type: Sequelize.DataTypes.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("products");
  },
};
