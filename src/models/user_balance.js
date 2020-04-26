'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_balance = sequelize.define('user_balance', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    balance_achieve: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },createdAt: {
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
  user_balance.associate = function(models) {
    models.user_balance.hasMany(models.user, {
      foreignKey: "id"
    });
    models.user_balance.hasOne(models.user_balance_histories, {
      foreignKey: "user_balance_id",
      as:"history"
    });
  };
  return user_balance;
};