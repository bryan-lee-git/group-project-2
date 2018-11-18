"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.NPC = require("./NPC")(sequelize, Sequelize);
db.Weapons = require("./Weapons")(sequelize, Sequelize);
db.Armor = require("./Armor")(sequelize, Sequelize);
db.Battle = require("./Battles")(sequelize, Sequelize);
db.Markets = require("./Markets")(sequelize, Sequelize);
db.Arenas = require("./Arenas")(sequelize, Sequelize);
db.Accounts = require("./Account")(sequelize, Sequelize);

db.User.hasMany(db.Weapons);
db.User.hasMany(db.Armor);
db.User.hasMany(db.Purchase, {
  onDelete: "cascade"
});
db.User.hasMany(db.Equipment, {
  onDelete: "cascade"
});
db.User.hasMany(db.Battle);

db.NPC.hasMany(db.Battle);
db.NPC.hasMany(db.Weapons);
db.NPC.hasMany(db.Armor);

db.Markets.hasOne(db.Weapons);
db.Markets.hasOne(db.Armor);

db.Arenas.hasMany(db.Battle);
db.Arenas.hasMany(db.NPC);
db.Arenas.hasOne(db.Markets);

db.Accounts.hasMany(db.User);

module.exports = db;
