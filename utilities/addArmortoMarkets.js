var db = require("../models");

var arenas = [];
var armors = [];

db.Arenas.findAll({}).then(arenaResults => {
  arenas = JSON.parse(JSON.stringify(arenaResults));

  db.Armor.findAll({}).then(armorResults => {
    armors = JSON.parse(JSON.stringify(armorResults));

    armors.forEach(armor => {
      console.log(`this armor strength is ${armor.strength}`);
      console.log(`this armor strength type is ${typeof armor.strength}`);
      arenas.forEach(arena => {
        if (armor.cost < 12 * (arena.frequency * arena.quantity)) {
          if (armor.name === "Shield") {
            db.Markets.create({
              name: armor.name,
              bonus: armor.strength,
              weight: armor.weight,
              ArenaId: arena.id
            }).then(result => {
              console.log(`Item ${armor.name} added to ${arena.name} market. `);
            });
          } else {
            db.Markets.create({
              name: armor.name,
              armor: armor.strength - 10,
              weight: armor.weight,
              ArenaId: arena.id
            }).then(result => {
              console.log(`Item ${armor.name} added to ${arena.name} market. `);
            });
          }
        }
      });
    });
  });
});
