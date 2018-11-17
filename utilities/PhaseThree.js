module.exports = function phaseThree(playerOne, playerTwo) {
  const speeds = [];
  playerOneSpeed = playerOne.setSpeed();
  playerTwoSpeed = playerTwo.setSpeed();
  speeds.push(playerOneSpeed);
  speeds.push(playerTwoSpeed);
  console.log(`inside phase 3, here's the speeds: `, speeds);
  return speeds;
};
