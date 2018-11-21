module.exports = function livePhaseSix(game, count) {
  // Fatigue
  //
  // foreach player ...
  //  if the total number of attacks in PhaseFive was greater than 0, then for each player, add //  their player.currentSpeed to their player.fatigue.
  //

 
  if (count > 0) {
    var sum = getAttackSpeedTotal(game["user[attacks]"].length);
    var extra = 0;

    game["user[fatigue]"] = sum;

    var sum = getAttackSpeedTotal(game["npc[attacks]"].length);
    game["npc[fatigue]"] = sum;
  }

  game["user[currentStamina]"] = setStamina(game["user"]);
  console.log(
    `Inside phase six, ${game["user[name]"]} currentStamina is ${
      game["user[currentStamina]"]
    }`
  );
  game["npc[currentStamina]"] = setStamina(game["npc"]);
  console.log(
    `Inside phase six, ${game["npc[name]"]} currentStamina is ${
      game["npc[currentStamina]"]
    }.`
  );
  //  After the fatigue has been added to each player (if any), then call player.setStamina()
  //
  //
  //

  setStamina = function(player) {
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
