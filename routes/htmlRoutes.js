var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Home.findAll({}).then(function(dbHome) {
      res.render("home");
    });
  });

  app.get("/character-create", function(req, res) {
    db.Character.findAll({}).then(function(dbUser) {
      res.render("character-create");
    });
  });

  app.get("/marketplace", function(req, res) {
    db.Market.findAll({}).then(function(dbMarkets) {
      res.render("marketplace");
    });
  });

  app.get("/training", function(req, res) {
    db.Training.findAll({}).then(function(dbTraining) {
      res.render("training");
    });
  });

  app.get("/arenas", function(req, res) {
    db.Arenas.findAll({}).then(function(dbArenas) {
      res.render("character-create");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
