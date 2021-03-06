module.exports = function phaseSix(playerOne, playerTwo, count, round) {
  // Fatigue
  //
  
  console.log(`We made it to the end of round ${round}.`);
  if (count > 0) {
    var sum = getAttackSpeedTotal(playerOne);
    var extra = 0;

    if (round % 4 === 0) {
      extra++;
    }

    playerOne.fatigue = sum + extra;

    var sum = getAttackSpeedTotal(playerTwo);
    playerTwo.fatigue = sum + extra;
  }

  playerOne.currentStamina = setStamina(playerOne);
  console.log(
    `Inside phase six, ${playerOne.name} currentStamina is ${
      playerOne.currentStamina
    }`
  );
  playerTwo.currentStamina = setStamina(playerTwo);
  console.log(
    `Inside phase six, ${playerTwo.name} currentStamina is ${
      playerTwo.currentStamina
    }.`
  );
  
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

function setStamina (player) {
  player.currentStamina =
    player.currentStamina - player.fatigue - player.wounds + player.recovery;
  if (player.currentStamina > player.stamina) {
    player.currentStamina = player.stamina;
  }
  player.maxStamina = player.stamina - player.wounds;
  return player.currentStamina > player.maxStamina
    ? player.maxStamina
    : player.currentStamina;
};

  return { playerOne, playerTwo }
};
