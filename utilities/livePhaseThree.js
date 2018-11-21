module.exports = function phaseThree(game) {
  const speeds = [];

  function setSpeed(speed, stamina, weight) {
    currentSpeed = speed - Math.floor(weight / 30);
    return currentSpeed > stamina ? stamina : currentSpeed;
  }

  playerOneSpeed = setSpeed(
    game["user[currentSpeed]"],
    game["user[currentStamina]"],
    game["user[armor][weight]"]
  );

  console.log(`the game npc is ${game["npc[name]"]}`);
  console.log(`the game npc's armor is ${game["npc[armor][name]"]}`);

  console.log(
    `the weight of ${game["npc[name]"]}'s armor is ${game["npc[armor][weight]"]}`
  );
  playerTwoSpeed = setSpeed(
    game["npc[currentSpeed]"],
    game["npc[currentStamina]"],
    game["npc[armor][weight]"]
  );
  speeds.push(playerOneSpeed);
  speeds.push(playerTwoSpeed);
  console.log(`inside phase 3, here's the speeds: `, speeds);
  return speeds;
};
