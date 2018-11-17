module.exports = function(sequelize, DataTypes) {
  var Weapons = sequelize.define("Weapon", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30]
      }
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    costType: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 2]
      }
    },
    weight: {
      type: DataTypes.STRING
    }
  });
  return Weapons;
};
