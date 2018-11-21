var db = require("../models");
var buildMarketClasses = require("./buildMarketGearClasses");
var prepNPCForBattle = require("./prepNPCForBattle");

 module.exports = function liveEquipNPC(npcID) {

    db.NPC.findAll({
        where: {
            id: npcID
        }
    }).then( npcResult => {

   
        console.log(`Here's what I got: `, npcResult);
    
        db.Markets.findAll({
          where: {
            ArenaId: 1
          }
        }).then(marketResult => {
  
      // Build the weapon and armor classes
    var classes = buildMarketClasses(marketResult);

      // Build the character
      
    var player = prepNPCForBattle(npcResult, classes);
    
    return { classes, player}

        });
    
    })
 };
