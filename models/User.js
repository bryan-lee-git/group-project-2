// model items
// name: string
// wallet: integer (float?)
// strength: integer
// speed: integer
// stamina: integer
// skill: integer

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60]
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    male: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    wallet: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
  return User;
};
