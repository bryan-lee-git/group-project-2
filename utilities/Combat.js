var phaseOne = require("./PhaseOne");
var phaseTwo = require("./PhaseTwo");
var phaseThree = require("./PhaseThree");
var phaseFour = require("./PhaseFour");
var phaseFive = require("./PhaseFive");
var phaseSix = require("./PhaseSix");

module.exports = combat = (Arena, playerOne, playerTwo) => {
  var battleResults = {
    playerOne: playerOne,
    playerTwo: playerTwo,
    winner: ""
  };
  phaseOne(Arena, playerOne, playerTwo);

  while (phaseTwo(playerOne, playerTwo)) {
    phaseThree(playerOne, playerTwo);
    phaseFour(playerOne, playerTwo);
    phaseFive(playerOne, playerTwo);
    phaseSix(playerOne, playerTwo);
  }

  battleResults.winner =
    playerOne.currentStamina > 0 ? playerOne.name : playerTwo.name;

  return battleResults;
};
