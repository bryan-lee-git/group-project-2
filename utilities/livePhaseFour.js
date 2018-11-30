var bull,
  bee,
  turtle,
  gadFly,
  panda,
  crane = require("./tactics");

var phaseThree = require("./PhaseThree");
var PhaseFive = require("./PhaseFive");

module.exports = function phaseFour(playerOne, playerTwo, playerOneTactic, playerTwoTactic, round) {

  var speeds = phaseThree(playerOne, playerTwo);

  const playerOneSpeed = speeds[0];
  const playerTwoSpeed = speeds[1];


  setAttacks(playerOne, playerOneTactic);
  setAttacks(playerTwo, playerTwoTactic);

  PhaseFive(playerOne, playerTwo, round);

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
        weapon: first.weapon
      };
      attacks.push({ attack });
    } else {
      attack = {
        attackSpeed: 5,
        attackType: tactics.type,
        weapon: firts.weapon
      };
      attacks.push({ attack });
      attack = {
        attackSpeed: tactics.choices.attackSpeed - 5,
        attackType: tactics.type,
        weapon: firts.weapon
      };
      attacks.push({ attack });
    }
    first.attacks = attacks;
  }
  
  console.log(`from inside livephasefour, here is ${playerOne.name}: `, playerOne)
  console.log(`from inside livephasefour, here is ${playerTwo.name}: `, playerTwo)
  return { playerOne, playerTwo }
};
