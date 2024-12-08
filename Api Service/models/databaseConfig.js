module.exports = function (sequelize, DataTypes) {
    const DatabaseConfig = sequelize.define('DatabaseConfig', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dialect: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      db_username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      db_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      db_host: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      config: {
        type: DataTypes.JSON,
        allowNull: true, // This can store additional configuration settings as JSON
      },
      db_context: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    }
    }, {
      tableName: 'database_config',
    });
  
    return DatabaseConfig;
  };
  