module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "Product",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING(200),
    },
    {
      tableName: "products",
      timestamps: false,
      underscored: true,
    }
  );

  product.associate = (models) => {
    product.hasMany(models.SaleProduct, {
      foreignKey: "productId",
      as: "products",
    });
  };

  return product;
};
