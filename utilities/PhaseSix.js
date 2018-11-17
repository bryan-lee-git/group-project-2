module.exports = function phaseSix(playerOne, playerTwo, count) {
  // Fatigue
  //
  // foreach player ...
  //  if the total number of attacks in PhaseFive was greater than 0, then for each player, add //  their player.currentSpeed to their player.fatigue.
  //
  if (count > 0) {
    var sum = getAttackSpeedTotal(playerOne);

    playerOne.fatigue = sum;

    var sum = getAttackSpeedTotal(playerTwo);
    playerTwo.fatigue = sum;
  }

  playerOne.currentStamina = playerOne.setStamina();
  console.log(
    `Inside phase six, ${playerOne.name} currentStamina is ${
      playerOne.currentStamina
    }`
  );
  playerTwo.currentStamina = playerTwo.setStamina();
  console.log(
    `Inside phase six, ${playerTwo.name} currentStamina is ${
      playerTwo.currentStamina
    }.`
  );
  //  After the fatigue has been added to each player (if any), then call player.setStamina()
  //
  //
  //
};
function getAttackSpeedTotal(player) {
  var number = player.attacks.length;
  var sum = 0;
  if (number > 0) {
    for (let i = 0; i < number; i++) {
      sum = sum + player.attacks[i].attack.attackSpeed;
    }
  }
  return sum;
}
