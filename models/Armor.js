module.exports = function(sequelize, DataTypes) {
  var Armor = sequelize.define("Armor", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30]
      }
    },
    strength: {
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
      type: DataTypes.INTEGER
    }
  });
  return Armor;
};
