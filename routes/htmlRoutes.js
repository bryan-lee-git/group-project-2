var db = require("../models");
var liveEquipNPC= require("../utilities/liveEquipNPC")

module.exports = function(app) {
  // landing page
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findOne({
          where: {
            AccountUuid: dbUser.dataValues.uuid
          }
        }).then(function(dbChar) {
          if (dbChar === null) {
            res.redirect("/character");
          } else {
            var user = {
              user: dbChar.dataValues,
              userInfo: dbUser.dataValues,
              id: req.session.passport.user,
              isloggedin: req.isAuthenticated()
            };
            res.render("landing", user);
          }
        });
      });
    } else {
      res.render("landing");
    }
  });

  // create new account page
  app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findOne({
          where: {
            AccountUuid: dbUser.dataValues.uuid
          }
        }).then(function(dbChar) {
          var user = {
            user: dbChar.dataValues,
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          };
          res.render("ludus-magnus", user);
        });
      });
    } else {
      res.render("accounts");
    }
  });

  // character creation page
  app.get("/character", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Arena.findAll({
          where: {
            id: 1
          }
        }).then(function(dbArena) {
          var user = {
            userInfo: dbUser.dataValues,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated(),
            arena: dbArena.dataValues
          };
          res.render("character", user);
        });
        // });
      });
    } else {
      res.redirect("/");
    }
  });

  // character menu page
  app.get("/ludus-magnus", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Weapons.findAll({}).then(function(results) {
          db.User.findOne({
            where: {
              AccountUuid: dbUser.dataValues.uuid
            }
          }).then(function(dbChar) {
            if (dbChar === null) {
              res.redirect("/character");
            } else {
              var user = {
                user: dbChar.dataValues,
                weapons: results,
                userInfo: dbUser.dataValues,
                id: req.session.passport.user,
                isloggedin: req.isAuthenticated()
              };
              res.render("ludus-magnus", user);
            }
          });
        });
      });
    } else {
      res.redirect("/");
    }
  });

  // market and training page
  app.get("/market", function(req, res) {
    if (req.isAuthenticated()) {
      
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findOne({
          where: {
            AccountUuid: dbUser.dataValues.uuid
          }
        }).then(function(dbChar) {
          if (dbChar === null) {
            res.redirect("/character");
          } else {
            db.Markets.findAll({
              where: {
                ArenaId: dbChar.ArenaId
              }
            }).then(function(dbMarket) {
              console.log(JSON.parse(JSON.stringify(dbMarket[0])))
                var user = {
                  market: JSON.parse(JSON.stringify(dbMarket)),
                  
                  user: dbChar.dataValues,
                  userInfo: dbUser.dataValues,
                  id: req.session.passport.user,
                  isloggedin: req.isAuthenticated()
                };
                console.log(`inside the market route, here's the user being sent to the market page: `, user)
               
                res.render("market", user);
              });
          }
        });
      });
    } else {
      res.redirect("/");
    }
  });

  // equipment page
  app.get("/equip", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findOne({
          include: db.Purchase,
          where: {
            AccountUuid: dbUser.dataValues.uuid
          }
        }).then(function(dbChar) {
          if (dbChar === null) {
            res.redirect("/character");
          } else {
            var user = {
              user: dbChar.dataValues,
              purchases: dbChar.dataValues.Purchases,
              userInfo: dbUser.dataValues,
              id: req.session.passport.user,
              isloggedin: req.isAuthenticated()
            };
            console.log(user.purchases);
            res.render("equip", user);
          }
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
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findOne({
          include: db.Equipment,
          where: {
            AccountUuid: dbUser.dataValues.uuid
          }
        }).then(function(dbChar) {
          if (dbChar === null) {
            res.redirect("/character");
          } else {
            var randomNumber = Math.floor(Math.random() * 40);
            console.log(`from inside the arena html route, the random number used to get theNPC from the db is ${randomNumber}.`)
            db.NPC.findOne({
              where: {
                id: randomNumber
              }
            }).then(function(dbNPC) {
              console.log(`from inside the arena get html route, here's the data about the NPC: `,dbNPC.dataValues);

              liveEquipNPC(dbNPC.dataValues,1).then(result => {
                console.log(`inside the arena get html route, here's the equipped npc: `, result);
                var battle = {
                  user: dbChar.dataValues,
                  weapon: dbChar.dataValues.Equipment[0],
                  armor: dbChar.dataValues.Equipment[1],
                  npc: dbNPC.dataValues,
                  npcWeapon: result.primaryWeapon,
                  npcArmor: result.armor,
                  userInfo: dbUser.dataValues,
                  id: req.session.passport.user,
                  isloggedin: req.isAuthenticated()
                };
                res.render("arena", battle);
              })
            });
          }
        });
      });
    } else {
      res.redirect("/");
    }
  });
  
  // leaderboard page
  app.get("/leaderboard", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findOne({
          include: db.Purchase,
          where: {
            AccountUuid: dbUser.dataValues.uuid
          }
        }).then(function(dbChar) {
          if (dbChar === null) {
            res.redirect("/character");
          } else {
            var user = {
              user: dbChar.dataValues,
              userInfo: dbUser.dataValues,
              id: req.session.passport.user,
              isloggedin: req.isAuthenticated()
            };
            res.render("leaderboard", user);
          }
        });
      });
    } else {
      res.redirect("/");
    }
  });
  
  // about page
  app.get("/about", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("about", user);
      });
    } else {
      res.redirect("/");
    }
  });
  
  // tech credits page
  app.get("/tech", function(req, res) {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("tech", user);
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
