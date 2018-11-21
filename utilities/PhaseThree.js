module.exports = function phaseThree(playerOne, playerTwo) {

  setSpeed = function(player) {
    player.currentSpeed = player.speed - Math.floor(player.armor.weight / 30);
    return player.currentSpeed > player.currentStamina
      ? player.currentStamina
      : player.currentSpeed;
  };


  const speeds = [];
  playerOneSpeed = setSpeed(playerOne);
  playerTwoSpeed = setSpeed(playerTwo);
  speeds.push(playerOneSpeed);
  speeds.push(playerTwoSpeed);
  console.log(`inside phase 3, here's the speeds: `, speeds);
  return speeds;
};
