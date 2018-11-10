module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    }
  });

  return Users;
};
