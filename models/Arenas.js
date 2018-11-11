// model items
// location name: string
// location image/setting: string (img url?)

module.exports = function(sequelize, DataTypes) {
  var Arena = sequelize.define("Arena", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    image: {
      type: DataTypes.STRING,
      validaqte: {
        isUrl: true
      }
    }
  });
  return Arena;
};
