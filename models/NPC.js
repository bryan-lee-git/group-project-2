// model items
// name: string
// strength: integer
// speed: integer
// stamina: integer
// skill: integer
// class (light, medium, heavy): string

module.exports = function(sequelize, DataTypes) {
  var NPC = sequelize.define("NPC", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    image: {
      type: DataTypes.STRING
    },
    male: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    strength: {
      type: DataTypes.INTEGER,
      allNull: false,
      notEmpty: true,
      validate: {
        max: 20
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allNull: false,
      notEmpty: true,
      validate: {
        max: 10
      }
    },
    stamina: {
      type: DataTypes.INTEGER,
      allNull: false,
      notEmpty: true,
      validate: {
        max: 20
      }
    },
    skill: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    }
  });
  return NPC;
};
