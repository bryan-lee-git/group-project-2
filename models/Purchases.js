module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define("Purchase", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30]
      }
    },
    statIncrease: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: 1
      }
    },
    weight: {
      type: DataTypes.INTEGER
    }
  });
  Purchase.associate = function(models) {
    Purchase.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Purchase;
};
