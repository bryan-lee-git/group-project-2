var db = require("../models");
var Combat = require("./Combat");
var prepNPCForBattle = require("./prepNPCForBattle");
var buildMarketClasses = require("./buildMarketGearClasses");

module.exports = function battle(arenaID, playerOne, playerTwo) {
  var arena = {};

  console.log(
    `From inside the beginning of liveBattle, here is player one: `,
    playerOne
  );
  console.log(
    `From inside the beginning of liveBattle, here is player two: `,
    playerTwo
  );

  db.Arenas.findAll({
    where: {
      id: arenaID
    }
  }).then(results => {
    arena = JSON.parse(JSON.stringify(results));
    console.log(`here's the arena info: `, arena);
    db.NPC.findAll({
      where: {
        ArenaId: arenaID
      }
    }).then(results => {
      var characters = [];
      characters.push(playerOne);
      characters.push(playerTwo);
      var players = [];

      db.Markets.findAll({
        where: {
          ArenaId: arenaID
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
};
