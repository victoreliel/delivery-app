"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      sellerId: {
        field: "seller_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          key: "id",
          model: "users",
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        field: "total_price",
        type: Sequelize.DataTypes.DECIMAL(9, 2),
      },
      deliveryAddress: {
        allowNull: false,
        field: "delivery_address",
        type: Sequelize.STRING(100),
      },
      deliveryNumber: {
        allowNull: false,
        field: "delivery_number",
        type: Sequelize.STRING(50),
      },
      saleDate: {
        allowNull: false,
        field: "sale_date",
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("sales");
  },
};
