"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sales_products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      saleId: {
        allowNull: false,
        field: "sale_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            key: "id",
            tableName: "sales",
          },
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      productId: {
        allowNull: false,
        field: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            key: "id",
            tableName: "products",
          },
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("sales_products");
  },
};
