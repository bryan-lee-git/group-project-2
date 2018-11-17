var phaseTwo = require("./PhaseTwo");

var phaseFour = require("./PhaseFour");

module.exports = combat = (Arena, playerOne, playerTwo) => {
  var battleResults = {
    playerOne: playerOne,
    playerOneName: playerOne.name,
    playerOnePrimary: playerOne.primaryWeapon.name,
    playerOneSecondary: playerOne.secondaryWeapon.name,
    playerOneArmor: playerOne.armor.type,
    playerOneShield: playerOne.armor.shield,
    playerTwo: playerTwo,
    playerTwoName: playerTwo.name,
    playerTwoPrimary: playerTwo.primaryWeapon.name,
    playerTwoSecondary: playerTwo.secondaryWeapon.name,
    playerTwoArmor: playerTwo.armor.type,
    playerTwoShield: playerTwo.armor.shield,
    rounds: rounds,
    winner: ""
  };

  console.log(`Inside the combat function. Our Arena is `, Arena);
  //phaseOne(Arena, playerOne, playerTwo);

  var rounds = 1;

  while (phaseTwo(playerOne, playerTwo)) {
    rounds++;
    phaseFour(playerOne, playerTwo, rounds);
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
