'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_balance_history = sequelize.define('user_balance_history', {
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
      allowNull: false,
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  user_balance_history.associate = function(models) {
    // associations can be defined here
  };
  return user_balance_history;
};