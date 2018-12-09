var db = require("../models");
var buildMarketClasses = require("./buildMarketGearClasses");
var livePrepNPCForBattle = require("./livePrepNPCForBattle");

 module.exports = function equipNPC(npc, arenaID) {
   return new Promise(function(resolve, reject) {

   

    db.Markets.findAll({
      where: {
        ArenaId: arenaID
      }
    }).then(marketResult => {
      // Build the weapon and armor classes
      var classes = buildMarketClasses(marketResult);

      // Build the character
     
        var player = livePrepNPCForBattle(npc, classes);

        resolve(player)
    
    });
  })
 };
