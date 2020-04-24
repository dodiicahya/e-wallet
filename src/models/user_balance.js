'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_balance = sequelize.define('user_balance', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance_achieve: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
    }
  }, {});
  user_balance.associate = function(models) {
    models.user_balance.hasMany(models.user, {
      foreignKey: "id"
    });
  };
  return user_balance;
};