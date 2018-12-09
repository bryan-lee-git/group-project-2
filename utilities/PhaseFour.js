var bull,
  bee,
  turtle,
  gadFly,
  panda,
  crane = require("./tactics");
var chooseTactic = require("./chooseTactic");
var phaseThree = require("./PhaseThree");
var PhaseFive = require("./PhaseFive");

module.exports = function phaseFour(playerOne, playerTwo, round) {
  var speeds = phaseThree(playerOne, playerTwo);

  const playerOneSpeed = speeds[0];
  const playerTwoSpeed = speeds[1];

  var playerOneTactic = chooseTactic(playerOne, playerTwo);
  playerOne.defenseSpeed = playerOneTactic.choices.defenseSpeed;
  console.log(`${playerOne.name} tactic is `, playerOneTactic);
  console.log(`${playerTwo.name} speed is ${playerOne.defenseSpeed}`);
  var playerTwoTactic = chooseTactic(playerTwo, playerOne);
  playerTwo.defenseSpeed = playerTwoTactic.choices.defenseSpeed;
  console.log(`playerTwo tactic is `, playerTwoTactic);
  console.log(`playerTwo defense speed is ${playerTwo.defenseSpeed}`);

  setAttacks(playerOne, playerOneTactic);
  setAttacks(playerTwo, playerTwoTactic);

  var phaseFiveResults = PhaseFive(playerOne, playerTwo, round);

  function setAttacks(first, tactics) {
    //console.log(`first player is `, first);
    if (first.currentSpeed > 0) {
      var number = 1;
    } else {
      var number = 0;
    }
    
    attack = {};
    attacks = [];
    if (tactics.attackSpeed > 5) {
      number = Math.floor(tactics.attackSpeed / 5) + 1;
      console.log(`number of attacks for ${first.name} is ${number}.`);
    }
    first.attacks = [];
    if (number === 0) {
      attack = {
        attackSpeed: 0,
        attackType: false,
        weapon: first.primaryWeapon
      };
    } else if (number === 1) {
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
    first.attacks = attacks;
  }
};
