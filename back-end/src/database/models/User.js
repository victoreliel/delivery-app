module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: DataTypes.STRING(255),
  },
    {
      tableName: 'users',
      timestamps: false,
    });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'sales',
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'sales',
    });
  };

  return User;
}
