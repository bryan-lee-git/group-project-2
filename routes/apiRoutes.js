var db = require("../models");
var liveCombat = require("../utilities/liveCombat");

module.exports = function(app) {
  //////////////////////////////////////////////////////////////////
  /// User routes
  //////////////////////////////////////////////////////////////////

  // Get all Users
  app.get("/api/users", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findAll({}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Get User by id
  app.get("/api/users/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findAll({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  app.get("/api/users/key", (req, res) => {
    db.Accounts.findAll({
      where: {
        accountKey: req.body.id
      }
    }).then(results => {
      console.log(`here's the account we got from /api/users/key `, results);
      db.Users.findAll({
        where: {
          AccountUuid: results.uuid
        }
      }).then(dbUser => {
        res.json(dbUser);
      });
    });
  });

  // Get User market purchases by id
  app.get("/api/users/purchases/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findAll({
          include: db.Purchase,
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Get User equipped items by id
  app.get("/api/users/equipment/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findAll({
          include: db.Equipment,
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new User
  app.post("/api/users", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.create({
          name: req.body.name,
          image: req.body.image,
          male: req.body.gender,
          strength: req.body.strength,
          speed: req.body.speed,
          stamina: req.body.stamina,
          skill: req.body.skill,
          wallet: req.body.wallet,
          AccountUuid: req.body.accountuuid
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Update a User by id
  app.put("/api/users/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.update({
          name: req.body.name,
          image: req.body.image,
          strength: req.body.strength,
          speed: req.body.speed,
          stamina: req.body.stamina,
          skill: req.body.skill
        }, {
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update User's wallet (selling or buying)
  app.put("/api/users/wallet/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.update({
          wallet: req.body.wallet
        }, {
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Update User's stats
  app.put("/api/users/stats/:id/:type", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        if (req.body.type === "speed") {
          db.User.update({
            speed: req.body.newStat
          }, {
            where: {
              id: req.params.id
            }
          }).then(results => {
            res.json(results);
          });
        } else if (req.body.type === "strength") {
          db.User.update({
            strength: req.body.newStat
          }, {
            where: {
              id: req.params.id
            }
          }).then(results => {
            res.json(results);
          });
        } else if (req.body.type === "stamina") {
          db.User.update({
            stamina: req.body.newStat
          }, {
            where: {
              id: req.params.id
            }
          }).then(results => {
            res.json(results);
          });
        };
      });
    } else {
      res.render("401")
    }
  });

  // Delete an User by id
  app.delete("/api/users/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.destroy({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// NPC routes
  //////////////////////////////////////////////////////////////////

  // Get all NPCs for an arena
  app.get("/api/npcs/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.NPC.findAll({
          where: {
            ArenaId: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new NPC

  app.post("/api/npcs/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.NPC.create({
          name: req.body.name,
          image: req.body.image,
          male: req.body.male,
          strength: req.body.strength,
          speed: req.body.speed,
          stamina: req.body.stamina,
          skill: req.body.skill,
          ArenaId: req.params.id
        }, {
          where: {
            ArenaId: req.params.id
          }
        }).then(results => {
          console.log(
            `${results.name} added to the NPC table on row ${results.id}.`
          );
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update an NPC by id
  app.put("/api/npcs/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.NPC.update({
          name: req.body.name,
          image: req.body.image,
          strength: req.body.strength,
          speed: req.body.speed,
          stamina: req.body.stamina,
          skill: req.body.skill,
          ArenaId: req.body.arenaid
        }, {
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Delete an NPC by id
  app.delete("/api/npcs/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.destroy({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Battle routes - We don't want to delete Battles, so no delete route.
  //////////////////////////////////////////////////////////////////

  // Get all Battles
  app.get("/api/battles", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findAll({}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new Battle
  app.post("/api/battles", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.create(req.body).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update a Battle by id
  app.put("/api/battles/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.update(req.body).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  app.get("/api/battles/:arenaid/:userid/:npcid", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        var user;
        var npc;
        var arenaid = req.params.arenaid;
        db.User.findAll({
          where: {
            id: req.params.userid
          }
        }).then(dbUser => {
          user = JSON.parse(JSON.stringify(dbUser));
          console.log(`here's the user going into the battle`, user);

          db.NPC.findAll({
            where: {
              id: req.params.npcid
            }
          }).then(dbNPC => {
            npc = JSON.parse(JSON.stringify(dbNPC));
            var arenaid = req.params.arenaid;
            console.log(
              `inside the api/battles/game get route, here's the incloming request: `,
              req.body
            );
            var game = req.body;
            var battle = liveCombat(arenaid, game);
            res.json(battle);
          });
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Arena routes
  //////////////////////////////////////////////////////////////////

  // Get all Arenas
  app.get("/api/arenas", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Arenas.findAll({}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new Arena - to be used in Development ONLY
  app.post("/api/arenas", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Arenas.create(req.body).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update an Arena by id
  app.put("/api/arenas/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Arenas.update(req.body).then(rssults => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Delete an NPC by id - to be used in Development ONLY
  app.delete("/api/npcs/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Arenas.destroy({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Markets routes
  //////////////////////////////////////////////////////////////////

  // Get all Markets
  app.get("/api/markets", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Markets.findAll({}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  app.get("/api/markets/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Markets.findAll({
          where: {
            ArenaId: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new Markets - to be used in Development ONLY
  app.post("/api/markets", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Markets.create({
          name: req.body.name,
          damage: req.body.damage,
          armor: req.body.armor,
          weight: req.body.weight,
          purchased: req.body.purchased,
          ArenaId: req.body.arenaid
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update a Markets by id
  app.put("/api/markets/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Markets.update({
          name: req.body.name,
          damage: req.body.damage,
          armor: req.body.armor,
          weight: req.body.weight,
          purchased: req.body.purchased,
          ArenaId: req.body.arenaid
        }, {
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Delete an Markets by id - to be used in Development ONLY
  app.delete("/api/markets/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Markets.destroy({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Purchase routes
  //////////////////////////////////////////////////////////////////

  // Make a purchase
  app.post("/api/purchase", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Purchase.create({
          name: req.body.name,
          statIncrease: req.body.statIncrease,
          cost: req.body.cost,
          type: req.body.type,
          weight: req.body.weight,
          UserId: req.body.characterId
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  app.delete("/api/purchase/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Purchase.destroy({
          where: {
            id: req.params.id
          }
        }).then(() => {}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Equipment routes
  //////////////////////////////////////////////////////////////////

  // Make a equipment
  app.post("/api/equipment", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        equip(req.body.type);
        function equip(itemType) {
          db.Equipment.destroy({
            where: {
              type: itemType
            }
          }).then(() => {
            db.Equipment.create({
              name: req.body.name,
              statIncrease: req.body.statIncrease,
              cost: req.body.statIncrease,
              type: req.body.type,
              weight: req.body.weight,
              UserId: req.body.characterId
            }).then(results => {
              res.json(results);
            });
          });
        }
      });
    } else {
      res.render("401")
    }
  });

  app.delete("/api/equipment/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Equipment.destroy({
          where: {
            id: req.params.id
          }
        }).then(() => {}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Weapon routes
  //////////////////////////////////////////////////////////////////

  // Get all Weapons
  app.get("/api/weapons", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Weapons.findAll({}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new Weapons
  app.post("/api/weapons", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Weapons.create({
          name: req.body.name,
          damage: req.body.damage,
          cost: req.body.cost,
          costType: req.body.costType,
          weight: req.body.weight,
          UserId: req.body.userId,
          NPCId: req.body.npcid
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update a Weapons by id - to be used in Development ONLY
  app.put("/api/weapons/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Weapons.update(req.body).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Delete a Weapon by id - to be used in Development ONLY
  app.delete("/api/weapons/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.Weapons.destroy({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //////////////////////////////////////////////////////////////////
  /// Armor routes
  //////////////////////////////////////////////////////////////////

  // Get all Armors
  app.get("/api/armors", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.findAll({}).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Create a new Armor
  app.post("/api/armors", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.create(req.body).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  //Update an Armor by id - to be used in Development ONLY
  app.put("/api/weapons/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.update(req.body).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });

  // Delete an Armor by id - to be used in Development ONLY
  app.delete("/api/weapons/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        db.User.destroy({
          where: {
            id: req.params.id
          }
        }).then(results => {
          res.json(results);
        });
      });
    } else {
      res.render("401")
    }
  });
};
