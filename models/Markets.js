// model items
// item name: string
// strength+: integer
// armor+: integer
// skill+ (?): integer
// purchased: boolean

module.exports = function(sequelize, DataTypes) {
  var Markets = sequelize.define("Market", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    damage: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    armor: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    bonus: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Markets;
};
