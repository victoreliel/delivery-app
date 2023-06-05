module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: "sales_products",
      timestamps: false,
      underscored: true,
    }
  );

  saleProduct.associate = (models) => {
    saleProduct.belongsTo(models.Sale, {
      as: "sales",
      through: saleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
    });

    saleProduct.belongsTo(models.Product, {
      as: "products",
      through: saleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  };

  return saleProduct;
};
