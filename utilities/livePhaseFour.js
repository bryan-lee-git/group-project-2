var bull,
  bee,
  turtle,
  gadFly,
  panda,
  crane = require("./tactics");
var liveChooseTactic = require("./liveChooseTactic");
var livePhaseThree = require("./livePhaseThree");
var livePhaseFive = require("./livePhaseFive");

module.exports = function livePhaseFour(game) {
  var speeds = livePhaseThree(game);

  function d6() {
    return Math.floor(Math.random() * 5) + 1;
  }

  var playerTwoTactic = liveChooseTactic(game);
  game["npc[defenseSpeed]"] = playerTwoTactic.choices.defenseSpeed;
  console.log(`${game["npc[name]"]} tactic is `, playerTwoTactic);
  console.log(`${game["npc[name]"]} defense speed is ${game["npc[defenseSpeed]"]}`);

  //setAttacks(playerOne, playerOneTactic);
  //setAttacks(playerTwo, playerTwoTactic);

  game["npc[attacks]"] = setAttacks(game, playerTwoTactic);

  var attackResults = livePhaseFive(game);

  function setAttacks(first, tactics) {
    //console.log(`first player is `, first);

    var number = 1;
    attack = {};
    attacks = [];
    if (tactics.attackSpeed > 5) {
      number = Math.floor(tactics.attackSpeed / 5) + 1;
      console.log(`number of attacks for ${first.name} is ${number}.`);
    }
    first.attacks = [];
    if (number === 1) {
      attack = {
        attackSpeed: tactics.choices.attackSpeed,
        attackType: tactics.type,
        weapon: first.primaryWeapon
      };
      attacks.push({ attack });
    } else {
      attack = {
        attackSpeed: 5,
        attackType: tactics.type,
        weapon: firts.primaryWeapon
      };
      attacks.push({ attack });
      attack = {
        attackSpeed: tactics.choices.attackSpeed - 5,
        attackType: tactics.type,
        weapon: firts.primaryWeapon
      };
      attacks.push({ attack });
    }
    return attacks;
  }
};
