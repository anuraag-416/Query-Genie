module.exports = function (sequelize, DataTypes) {
  const Query = sequelize.define('Query', {
    query_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    db_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    conversation_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    query_ques: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: 'query',
  });


  return Query;
};
