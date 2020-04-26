'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type:{
      type: DataTypes.ENUM('system','users'),
      allowNull: false,
      defaultValue:'users'
    },
    balance:{
      allowNull: true,
      type: DataTypes.DECIMAL(15,2),
      defaultValue:0
    },
    is_login:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
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
  user.associate = function(models) {
    models.user.hasMany(models.user_balance, {
      foreignKey: "id"
    });
  };
  return user;
};