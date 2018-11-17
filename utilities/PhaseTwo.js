module.exports = function phaseTwo(playerOne, playerTwo) {
  // This function checks to see if the game should be over.

  // If both conditions are true, it will return true. If the first is false, it will return false. If the first is true and second false, it will return false.

  console.log(`Welcome to phase 2. Bye now!`);

  return playerOne.currentStamina > 0 && playerTwo.currentStamina > 0;
};
