var db = require("../models");

module.exports = function(app) {
  // landing page
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("landing", user);
      });
    } else {
      res.render("landing");
    }
  });

  // create new account page
  app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("ludus-magnus", user);
      });
    } else {
      res.render("accounts");
    }
  });
  // create character page
  app.get("/character", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("character", user);
      });
    } else {
      res.redirect("/");
    }
  });
  // character menu page
  app.get("/ludus-magnus", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        db.Weapons.findAll({}).then(results => {
          //console.log(`here's the results: `, results);
          var user = {
            weapons: results,
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          };
          res.render("ludus-magnus", user);
        });
      });
    } else {
      res.redirect("/");
    }
  });
  // marketplace page
  app.get("/marketplace", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        db.User.findAll({
          where: { name: dbUser.dataValues.firstName }
        }).then(dbChar => {
          var user = {
            user: dbChar[0].dataValues,
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          };
          res.render("market", user);
        });
      });
    } else {
      res.redirect("/");
    }
  });
  // arena/battle page
  app.get("/arena", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        db.User.findAll({
          where: { name: dbUser.dataValues.firstName }
        }).then(dbChar => {
          let randomNumber = Math.floor(Math.random() * 25);
          db.NPC.findAll({where: {id: randomNumber}}).then(dbNPC => {
            var battle = {
              user: dbChar[0].dataValues,
              npc: dbNPC[0].dataValues,
              userInfo: dbUser.dataValues,
              id: req.session.passport.user,
              isloggedin: req.isAuthenticated()
            };
            res.render("arena", battle);
          });
        });
      });
    } else {
      res.redirect("/");
    }
  });
  // instructions page
  app.get("/instructions", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: { uuid: req.session.passport.user }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("instructions", user);
      });
    } else {
      res.redirect("/");
    }
  });
  // 404 for non-existent pages
  app.get("*", function(req, res) {
    res.render("404");
  });
};
