var db = require("../models");

// For each arena, add weapons and armor into the market only if the cost of the item is less that the total weekly battles at that arena = frequency times quantity.
// Step one: get arenas
// Step two: get weapons
// Step three: get armor
// step four: test each weapon against the weekly battles for each arena. if it's less than, add that item to the market with the arena's id as foreign key. On the market, do this: (ArenaId: arena.id).

var arenas = [];
var weapons = [];

db.Arenas.findAll({}).then(arenaResults => {
  arenas = JSON.parse(JSON.stringify(arenaResults));

  db.Weapons.findAll({}).then(weaponsResults => {
    weapons = JSON.parse(JSON.stringify(weaponsResults));

    weapons.forEach(weapon => {
      console.log(`this weapon is `, weapon);
      arenas.forEach(arena => {
        db.Markets.create({
          name: weapon.name,
          damage: weapon.damage,
          weight: weapon.weight,
          cost: weapon.cost,
          ArenaId: arena.id
        }).then(result => {
          console.log(`Item ${weapon.name} added to ${arena.name} market. `);
        });
      });
    });
  });
});
