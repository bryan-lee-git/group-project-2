var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("landing", user);
    } else {
      res.render("landing");
    }
  });

  app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/accounts/view");
    } else {
      res.render("accounts");
    }
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

  app.get("/ludus-magnus", function(req, res) {
    db.Weapons.findAll({}).then(results => {
      //console.log(`here's the results: `, results);
      var hbsObject = {
        weapons: results
      };
      console.log("Here's the hbsObject datavalues", hbsObject.weapons[0].name);
      res.render("ludus-magnus", hbsObject);
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

  app.get("/arenas/:id", (req, res) => {
    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(results => {
      var hbsObject = {
        user: results
      };
      res.render("arena", hbsObject);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
