var autoNPC = require("./autoNPC");
var request = require("request");
var db = require("../models");

var arenas = [];

db.Arenas.findAll({
  where: {
    id: 1
  }
}).then(results => {
  arenas = JSON.stringify(results);
  items = JSON.parse(arenas);

  items.forEach(arena => {
    console.log(`here's the arena name: `, arena.name);
    console.log(`here's the arena id: `, arena.id);
    var monthlyBattles = 4 * (arena.frequency * arena.quantity);
    console.log(
      `There are ${monthlyBattles} battles at ${arena.name} every month.`
    );

    var timer = setTimeout(function setNPC() {
      autoNPC(arena.id);
      console.log(`Another NPC added to the ${arena.name} arena.`);
      monthlyBattles--;
      console.log(
        `There are ${monthlyBattles} NPCs left to build for ${arena.name}.`
      );
      if (monthlyBattles > 0) {
        timer = setTimeout(setNPC, 300);
      } else {
        clearTimeout(timer);
      }
    }, 300);
  });
});
