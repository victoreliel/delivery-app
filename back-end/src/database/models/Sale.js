module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define(
    "Sale",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      tableName: "sales",
      timestamps: false,
      underscored: true,
    }
  );

  sale.associate = (models) => {
    sale.hasMany(models.SaleProduct, {
      foreignKey: "saleId",
      as: "sales",
    });
  };

  sale.associate = (models) => {
    sale.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  sale.associate = (models) => {
    sale.belongsTo(models.User, {
      foreignKey: "sellerId",
      as: "seller",
    });
  };

  return sale;
};
