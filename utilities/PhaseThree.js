export default function phaseThree(playerOne, playerTwo) {
  const speeds = [];
  speeds.push(playerOne.setSpeed());
  speeds.push(playerTwo.setSpeed());
  return speeds;
}
