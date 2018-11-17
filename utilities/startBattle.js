var db = require("../models");
var Combat = require("./Combat");
var prepNPCForBattle = require("./prepNPCForBattle");
var buildMarketClasses = require("./buildMarketGearClasses");

function d20() {
  return Math.floor(Math.random() * 19) + 1;
}

var arena = {};

db.Arenas.findAll({
  where: {
    id: 1
  }
}).then(results => {
  arena = JSON.parse(JSON.stringify(results));
  console.log(`here's the arena info: `, arena);
  db.NPC.findAll({
    where: {
      ArenaId: 1
    }
  }).then(results => {
    //console.log(JSON.parse(JSON.stringify(results)));
    var clean = JSON.parse(JSON.stringify(results));
    const pickOne = d20();
    const pickTwo = d20();
    console.log(`pickOne is ${pickOne} and pickTwo is ${pickTwo}.`);
    var firstPick = clean[pickOne];
    var secondPick = clean[pickTwo];
    console.log(`first pick is`, firstPick);
    console.log(`secondPick is`, secondPick);

    var characters = [];
    characters.push(firstPick);
    characters.push(secondPick);
    var players = [];

    db.Markets.findAll({
      where: {
        ArenaId: 1
      }
    }).then(marketResult => {
      // Build the weapon and armor classes
      var classes = buildMarketClasses(marketResult);

      // Build the character
      characters.forEach(character => {
        var player = prepNPCForBattle(character, classes);
        players.push(player);
      });

      console.log(`Here are the combatants. playerOne: `, players[0]);
      console.log(`playerTwo: `, players[1]);
      console.log(`Arena is`, arena);

      Combat(arena, players[0], players[1]);
    });
  });
});
