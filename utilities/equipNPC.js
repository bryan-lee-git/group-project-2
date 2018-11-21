var db = require("../models");
var buildMarketClasses = require("./buildMarketGearClasses");
var prepNPCForBattle = require("./prepNPCForBattle");

 module.exports = function equipNPC(id) {
  db.NPC.findAll({
    where: {
      ArenaId: 3
    }
  }).then(npcResults => {
    var characters = JSON.parse(JSON.stringify(npcResults));
    //console.log(`Here's what I got: `, characters);

    db.Markets.findAll({
      where: {
        ArenaId: 8
      }
    }).then(marketResult => {
      // Build the weapon and armor classes
      var classes = buildMarketClasses(marketResult);

      // Build the character
      characters.forEach(character => {
        var player = prepNPCForBattle(character, classes);
      });
    });
  });
 };
