var db = require("../models");

module.exports = function(app) {
  //////////////////////////////////////////////////////////////////
  /// User routes
  //////////////////////////////////////////////////////////////////

  // Get all Users
  app.get("/api/users", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new User
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then(results => {
      res.json(results);
    });
  });

  //Update a User by id
  app.put("/api/users/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  // Delete an User by id
  app.delete("/api/user/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then(results => {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////
  /// NPC routes
  //////////////////////////////////////////////////////////////////

  // Get all NPCs
  app.get("/api/npcs", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new NPC
  // Post route takes a Player object. Must parse out only the datato be saved to the NPC table: name, image, male, strength, speed, stamina, skill.
  app.post("/api/npcs", (req, res) => {
    db.User.create({
      name: req.body.name,
      image: req.body.image,
      male: req.body.male,
      strength: req.body.strength,
      speed: req.body.speed,
      stamina: req.body.stamina,
      skill: req.body.skill
    }).then(results => {
      console.log(
        `${results.name} added to the NPC table on row ${results.id}.`
      );
      res.json(results);
    });
  });

  //Update a NPC by id
  app.put("/api/npcs/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  // Delete an NPC by id
  app.delete("/api/npcs/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then(results => {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////
  /// Battle routes - We don't want to delete Battles, so no delete route.
  //////////////////////////////////////////////////////////////////

  // Get all Battles
  app.get("/api/battles", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new Battle
  app.post("/api/battles", (req, res) => {
    db.User.create(req.body).then(results => {
      res.json(results);
    });
  });

  //Update a Battle by id
  app.put("/api/battles/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////
  /// Arena routes
  //////////////////////////////////////////////////////////////////

  // Get all Arenas
  app.get("/api/arenas", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new Arena - to be used in Development ONLY
  app.post("/api/arenas", (req, res) => {
    db.User.create(req.body).then(results => {
      res.json(results);
    });
  });

  //Update an Arena by id
  app.put("/api/arenas/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  // Delete an NPC by id - to be used in Development ONLY
  app.delete("/api/npcs/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then(results => {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////
  /// Markets routes
  //////////////////////////////////////////////////////////////////

  // Get all Markets
  app.get("/api/markets", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new Markets - to be used in Development ONLY
  app.post("/api/markets", (req, res) => {
    db.User.create(req.body).then(results => {
      res.json(results);
    });
  });

  //Update a Markets by id
  app.put("/api/markets/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  // Delete an Markets by id - to be used in Development ONLY
  app.delete("/api/markets/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then(results => {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////
  /// Weapon routes
  //////////////////////////////////////////////////////////////////

  // Get all Weapons
  app.get("/api/weapons", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new Weapons
  app.post("/api/weapons", (req, res) => {
    db.User.create(req.body).then(results => {
      res.json(results);
    });
  });

  //Update a Weapons by id - to be used in Development ONLY
  app.put("/api/weapons/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  // Delete a Weapon by id - to be used in Development ONLY
  app.delete("/api/weapons/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then(results => {
      res.json(results);
    });
  });

  //////////////////////////////////////////////////////////////////
  /// Armor routes
  //////////////////////////////////////////////////////////////////

  // Get all Armors
  app.get("/api/armors", (req, res) => {
    db.User.findAll({}).then(results => {
      res.json(results);
    });
  });

  // Create a new Armor
  app.post("/api/armors", (req, res) => {
    db.User.create(req.body).then(results => {
      res.json(results);
    });
  });

  //Update an Armor by id - to be used in Development ONLY
  app.put("/api/weapons/:id", (req, res) => {
    db.User.update(req.body).then(rssults => {
      res.json(results);
    });
  });

  // Delete an Armor by id - to be used in Development ONLY
  app.delete("/api/weapons/:id", (req, res) => {
    db.User.destroy({ where: { id: req.params.id } }).then(results => {
      res.json(results);
    });
  });
};
