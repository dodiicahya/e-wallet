'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_balance_history = sequelize.define('user_balance_histories', {
    user_balance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance_before: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance_after: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: { 
      type: DataTypes.ENUM("credit", "debit"),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn("NOW")
    }
  }, {});
  user_balance_history.associate = function(models) {
    models.user_balance_histories.belongsTo(models.user_balance, {
      foreignKey: "user_balance_id"
    });
  };
  return user_balance_history;
};