var uuidv1 = require("uuidv1");
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var Accounts = sequelize.define("Accounts", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    accountKey: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8]
      }
    }
  });

  Accounts.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  Accounts.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.accountKey);
  };
  return Accounts;
};
