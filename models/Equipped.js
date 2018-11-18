module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define("Equipment", {
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
  Equipment.associate = function(models) {
    Equipment.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Equipment;
};
