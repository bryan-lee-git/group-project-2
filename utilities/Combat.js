var phaseTwo = require("./PhaseTwo");

var phaseFour = require("./PhaseFour");

module.exports = combat = (Arena, playerOne, playerTwo) => {
  var battleResults = {
    playerOne: playerOne,
    playerTwo: playerTwo,
    winner: ""
  };

  console.log(`Inside the combat function. Our Arena is `, Arena);
  //phaseOne(Arena, playerOne, playerTwo);

  var rounds = 1;

  while (phaseTwo(playerOne, playerTwo)) {
    rounds++;
    phaseFour(playerOne, playerTwo);
  }

  battleResults.winner =
    playerOne.currentStamina > 0 ? playerOne.name : playerTwo.name;

  console.log(
    `The winner of the battle between ${playerOne.name} and ${
      playerTwo.name
    } is ${battleResults.winner}.`
  );
  console.log(`Battle lasted ${rounds} rounds.`);

  return battleResults;
};
