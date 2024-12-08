const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
      },
      user_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
      },
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          onUpdate: DataTypes.NOW,
      },
  }, {
      tableName: 'User',
      timestamps: true, // Automatically adds createdAt and updatedAt fields
  });

  return UserModel;
};

module.exports = User;
