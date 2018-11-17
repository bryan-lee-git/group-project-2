var { bull, bee, turtle, gadFly, panda, crane } = require("./tactics");

function chooseTactic(playerOne, playerTwo) {
  if (playerOne.currentStamina <= 0 && playerOne.maxStamina > 0) {
    var choices = turtle(playerOne);
    var type = false;
  }

  if (playerOne.strength > playerTwo.strength) {
    if (playerTwo.maxStamina < playerTwo.stamina) {
      var choices = bull(playerOne);
      var type = true;
    } else if (playerOne.currentSpeed > playerTwo.speed) {
      var choices = panda(playerOne);
      var type = playerTwo.armor.weight === 0 ? true : false;
    } else {
      var choices = gadFly(playerOne);
      var type = false;
    }
  } else if (playerTwo.strength > playerOne.strength) {
    if (playerTwo.maxStamina < playerTwo.stamina) {
      var choices = crane(playerOne);
      var type = playerTwo.armor.weight > 45 ? false : true;
    } else if (
      playerOne.currentStamina > playerOne.speed &&
      playerTwo.currentStamina > playerTwo.speed
    ) {
      if (playerTwo.speed > playerOne.speed) {
        var choices = gadFly(playerOne);
        var type = false;
      } else if (playerOne.speed > playerTwo.speed) {
        var choices = crane(playerOne);
        var type = playerTwo.armor.weight > 45 ? false : true;
      } else {
        var choices = gadFly(playerOne);
        var type = false;
      }
    } else {
      var choices = gadFly(playerOne);
      var type = false;
    }
  } else if (playerOne.currentStamina > playerOne.speed) {
    if (playerTwo.currentStamina < playerTwo.speed) {
      if (playerTwo.speed > playerOne.speed) {
        var choices = gadFly(playerOne);
        var type = false;
      } else if (playerOne.speed > playerTwo.speed) {
        var choices = crane(playerOne);
        var type = playerTwo.armor.weight > 45 ? false : true;
      } else {
        var choices = bee(playerOne);
        var type = playerTwo.armor.weight > 13 ? false : true;
      }
    } else if (playerTwo.speed > playerOne.speed) {
      var choices = gadFly(playerOne);
      var type = false;
    } else if (playerOne.speed > playerTwo.speed) {
      var choices = bull(playerOne);
      var type = true;
    } else {
      var choices = crane(playerOne);
      var type = playerTwo.armor.weight > 45 ? false : true;
    }
  } else if (playerTwo.maxStamina < playerTwo.stamina) {
    var choices = bull(playerOne);
    var type = true;
  } else if (playerOne.currentStamina < 0) {
    var choices = gadFly(playerOne);
    var type = false;
  } else if (
    playerOne.currentStamina > playerOne.speed &&
    playerTwo.currentStamina > playerTwo.speed
  ) {
    var choices = bee(playerOne);
    var type = playerTwo.armor.weight > 13 ? false : true;
  } else if (playerTwo.currentStamina < 0) {
    var choices = bull(playerOne);
    var type = true;
  } else if (playerTwo.speed > playerOne.speed) {
    var choices = gadFly(playerOne);
    var type = false;
  } else if (playerOne.speed > playerTwo.speed) {
    var choices = crane(playerOne);
    var type = playerTwo.armor.weight > 45 ? false : true;
  } else {
    var choices = bee(playerOne);
    var type = playerTwo.armor.weight > 13 ? false : true;
  }

  // Make sure the minimum attackSpeed for Heavy Weapons is 3. Otherwise, if total speed < 3, attackSpeed = 0.
  if (playerOne.primaryWeapon.weight > 5 && choices.attackSpeed < 3) {
    let total = choices.attackSpeed + choices.defenseSpeed;
    if (total >= 3) {
      choices.attackSpeed = 3;
      choices.defenseSpeed = total - 3;
    } else {
      choices.attackSpeed = 0;
      choices.defenseSpeed = total;
    }
  }

  console.log(
    `from inside chooseTactic, here's the ready to export choices: `,
    choices
  );
  console.log(
    `from inside chooseTactic, here's the ready to export type: `,
    type
  );
  return { choices, type };
}

module.exports = chooseTactic;
