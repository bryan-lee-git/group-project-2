var db = require("../models");
var liveCombat = require("../utilities/liveCombat");
var chooseTactic= require("../utilities/chooseTactic");
var liveUserChooseTactic = require("../utilities/liveUserChooseTactic");
var livePhaseFour = require("../utilities/livePhaseFour");
var PhaseTwo = require("../utilities/PhaseTwo");



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

  app.post("/api/battles/game/:arenaid", (req, res) => {
    if (req.isAuthenticated()) {
        var arenaid = req.params.arenaid;
        console.log(arenaid);
    
        //console.log(req);
        console.log(req.body)
        var game = req.body;
        //console.log(game);
        //console.log(req.body["user[id]"]);
        var battle = liveCombat(arenaid, game);
        res.json(battle);
        
    } else {
      res.render("401")
    }
  });

  app.post("/api/battles/attacks", (req, res) => {
    console.log(`inside api battles attacks, here's the req.body: `, req.body)

    var round = parseInt(req.body["round"]);

    var userTactics = {
      choices: {
        attackSpeed: parseInt(req.body["userTactics[choices][attackSpeed]"]),
        defenseSpeed: parseInt(req.body["userTactics[choices][defenseSpeed]"])
      },
      type: req.body["userTactics[type]"]
    };

    var npcTactics = {
      choices: {
        attackSpeed: parseInt(req.body["npcTactics[choices][attackSpeed]"]),
        defenseSpeed: parseInt(req.body["npcTactics[choices][defenseSpeed]"])
      },
      type: req.body["npcTactics[type]"]
    }

    var player = {
      id: req.body["gameData[user][id]"],
      name: req.body["gameData[user][name]"],
      stamina: parseInt(req.body["gameData[user][stamina]"]),
      strength: parseInt(req.body["gameData[user][strength]"]),
      speed: parseInt(req.body["gameData[user][speed]"]),
      skill: parseInt(req.body["gameData[user][skill]"]),
      recovery: Math.floor((parseInt(req.body["gameData[user][stamina]"]) - 10) / 2) + 1,
      wounds: 0,
      currentSpeed: parseInt(req.body["gameData[user][currentSpeed]"]),
      currentStamina: parseInt(req.body["gameData[user][currentStamina]"]),
      maxStamina: parseInt(req.body["gameData[user][maxStamina]"]),
      defenseSpeed: userTactics.choices.defenseSpeed,
      attacks: [],
      weapon: {
        name: req.body["gameData[user][weapon][name]"],
        damage: parseInt(req.body["gameData[user][weapon][statIncrease]"]),
        weight: parseInt(req.body["gameData[user][weapon][weight]"])
      },
      armor: {
        name: req.body["gameData[user][armor][name]"],
        strength: parseInt(req.body["gameData[user][armor][statIncrease]"]),
        weight: parseInt(req.body["gameData[user][armor][weight]"]),
        shield: Boolean(req.body["gameData[user][armor][shield]"])
      }
    };
    
    var npc = {
      id: req.body["gameData[npc][id]"],
      name: req.body["gameData[npc][name]"],
      stamina: parseInt(req.body["gameData[npc][stamina]"]),
      strength: parseInt(req.body["gameData[npc][strength]"]),
      speed: parseInt(req.body["gameData[npc][speed]"]),
      skill: parseInt(req.body["gameData[npc][skill]"]),
      recovery: Math.floor((parseInt(req.body["gameData[npc][stamina]"]) - 10) / 2) + 1,
      wounds: 0,
      currentSpeed: parseInt(req.body["gameData[npc][currentSpeed]"]),
      currentStamina: parseInt(req.body["gameData[npc][currentStamina]"]),
      maxStamina: parseInt(req.body["gameData[npc][maxStamina]"]),
      defenseSpeed: npcTactics.choices.defenseSpeed,
      attacks: [],
      weapon: {
        name: req.body["gameData[npc][weapon][name]"],
        damage: parseInt(req.body["gameData[npc][weapon][statIncrease]"]),
        weight: parseInt(req.body["gameData[npc][weapon][weight]"])
      },
      armor: {
        name: req.body["gameData[npc][armor][name]"],
        strength: parseInt(req.body["gameData[npc][armor][statIncrease]"]),
        weight: parseInt(req.body["gameData[npc][armor][weight]"]),
        shield: Boolean(req.body["gameData[npc][armor][shield]"])
      }
  }

    var roundResults = livePhaseFour(player, npc, userTactics, npcTactics, round);

    res.json(roundResults);

  });

  app.post(`/api/battles/attacks/phasetwo`, (req, res) => {

    console.log(`here's req.body inside the api battles attacks phase two: `, req.body)
    
    
    const playerOne = {
      currentStamina: req.body["playerOne[currentStamina]"]
    }
    
    const playerTwo = {
      currentStamina: req.body["playerTwo[currentStamina]"]
    }

    console.log(`inside api battles attacks phase two, here's player one current stamina: ${playerOne.currentStamina} and player two current stamina: ${playerTwo.currentStamina}.`)

    const result = PhaseTwo(playerOne, playerTwo)
    res.json(result)
  })

  app.post("/api/battles/user/tactic/:userTactic", (req, res) => {
    
      const choice = req.params.userTactic.toLowerCase();

      if (req.isAuthenticated()) {
        console.log(`inside api user tactic, here's the choice: ${choice}`)

        var player = {
          id: req.body["user[id]"],
          name: req.body["user[name]"],
          stamina: req.body["user[stamina]"],
          strength: req.body["user[strength]"],
          speed: req.body["user[speed]"],
          skill: req.body["user[skill]"],
          currentSpeed: req.body["user[currentSpeed]"],
          currentStamina: req.body["user[currentStamina]"],
          maxStamina: req.body["user[maxStamina]"],
          defenseSpeed: req.body["user[defenseSpeed]"],
          attacks: [],
          weapon: {
            name: req.body["user[weapon][name]"],
            statIncrease: req.body["user[weapon][statIncrease]"],
            weight: req.body["user[weapon][weight]"]
          },
          armor: {
            name: req.body["user[armor][name]"],
            statIncrease: req.body["user[armor][statIncrease]"],
            weight: req.body["user[armor][weight]"],
            shield: req.body["user[armor][shield]"]
          }
        };
        
        var npc = {
          id: req.body["npc[id]"],
          name: req.body["npc[name]"],
          stamina: req.body["npc[stamina]"],
          strength: req.body["npc[strength]"],
          speed: req.body["npc[speed]"],
          skill: req.body["npc[skill]"],
          currentSpeed: req.body["npc[currentSpeed]"],
          currentStamina: req.body["npc[currentStamina]"],
          maxStamina: req.body["npc[maxStamina]"],
          defenseSpeed: req.body["npc[defenseSpeed]"],
          attacks: [],
          weapon: {
            name: req.body["npc[weapon][name]"],
            statIncrease: req.body["npc[weapon][statIncrease]"],
            weight: req.body["npc[weapon][weight]"]
          },
          armor: {
            name: req.body["npc[armor][name]"],
            statIncrease: req.body["npc[armor][statIncrease]"],
            weight: req.body["npc[armor][weight]"],
            shield: req.body["npc[armor][shield]"]
          }
      }

      var result = liveUserChooseTactic(player, npc, choice);

      res.json(result)
    }
  })

  app.post("/api/battles/npc/tactic/:NPCid", (req,res) => {
    if (req.isAuthenticated()) {
      var NPCid = req.params.NPCid;

      console.log(`inside the npc tactic api route, here's the req.body`, req.body)

      var player = {
        id: req.body["user[id]"],
        name: req.body["user[name]"],
        stamina: req.body["user[stamina]"],
        strength: req.body["user[strength]"],
        speed: req.body["user[speed]"],
        skill: req.body["user[skill]"],
        currentSpeed: req.body["user[currentSpeed]"],
        currentStamina: req.body["user[currentStamina]"],
        maxStamina: req.body["user[maxStamina]"],
        defenseSpeed: req.body["user[defenseSpeed]"],
        attacks: [],
        weapon: {
          name: req.body["user[weapon][name]"],
          statIncrease: req.body["user[weapon][statIncrease]"],
          weight: req.body["user[weapon][weight]"]
        },
        armor: {
          name: req.body["user[armor][name]"],
          statIncrease: req.body["user[armor][statIncrease]"],
          weight: req.body["user[armor][weight]"],
          shield: req.body["user[armor][shield]"]
        }
      };
      
      var npc = {
        id: req.body["npc[id]"],
        name: req.body["npc[name]"],
        stamina: req.body["npc[stamina]"],
        strength: req.body["npc[strength]"],
        speed: req.body["npc[speed]"],
        skill: req.body["npc[skill]"],
        currentSpeed: req.body["npc[currentSpeed]"],
        currentStamina: req.body["npc[currentStamina]"],
        maxStamina: req.body["npc[maxStamina]"],
        defenseSpeed: req.body["npc[defenseSpeed]"],
        attacks: [],
        weapon: {
          name: req.body["npc[weapon][name]"],
          statIncrease: req.body["npc[weapon][statIncrease]"],
          weight: req.body["npc[weapon][weight]"]
        },
        armor: {
          name: req.body["npc[armor][name]"],
          statIncrease: req.body["npc[armor][statIncrease]"],
          weight: req.body["npc[armor][weight]"],
          shield: req.body["npc[armor][shield]"]
        }
      };
      if (npc.currentSpeed !== 0) {
        var NPCTactic = chooseTactic(npc, player);
        res.json(NPCTactic)
      } else {
        const choices = {
          attackSpeed: 0,
          defenseSpeed: 0
        };
        res.json(choices)
      }
      
    }
  })

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
