module.exports = function phaseThree(playerOne, playerTwo) {

  console.log(`inside phase three, ${playerOne.name}'s speed is ${playerOne.speed} and ${playerTwo.name}'s speed is ${playerTwo.speed} and the sum of the speeds is ${playerOne.speed + playerTwo.speed}. Also, ${playerTwo.name}'s armor weighs ${playerTwo.armor.weight} pounds.`)

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
