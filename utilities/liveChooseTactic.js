var { bull, bee, turtle, gadFly, panda, crane } = require("./liveTactics");

function chooseTactic(game) {
  const playerOne = game;
  console.log(`inside liveChooseTactics, this is playerOne: `, playerOne)
  const playerOneCurrentStamina = game["user[currentStamina]"];
  const playerOneMaxStamina = game["user[maxStamina]"];
  const playerTwoMaxStamina = game["npc[maxStamina]"];
  const playerOneStrength = game["user[strength]"];
  const playerTwoStrength = game["npc[strength]"];
  const playerTwoStamina = game["npc[stamina]"];
  const playerOneCurrentSpeed = game["user[currentSpeed]"];
  const playerTwoSpeed = game["npc[speed]"];
  const playerTwoArmorWeight = game["npc[armor][weight]"];
  const playerOneSpeed = game["user[speed]"];
  const playerTwoCurrentStamina = game["npc[currentStamina]"];
  const playerOneWeaponWeight = game["user[weapon][weight]"];

  if (playerOneCurrentStamina <= 0 && playerOneMaxStamina > 0) {
    var choices = turtle(playerOne);
    var type = false;
  }

  if (playerOneStrength > playerTwoStrength) {
    if (playerTwoMaxStamina < playerTwoStamina) {
      var choices = bull(playerOne);
      var type = true;
    } else if (playerOneCurrentSpeed > playerTwoSpeed) {
      var choices = panda(playerOne);
      var type = playerTwoArmorWeight === 0 ? true : false;
    } else {
      var choices = gadFly(playerOne);
      var type = false;
    }
  } else if (playerTwoStrength > playerOneStrength) {
    if (playerTwoMaxStamina < playerTwoStamina) {
      var choices = crane(playerOne);
      var type = playerTwoArmorWeight > 45 ? false : true;
    } else if (
      playerOneCurrentStamina > playerOneSpeed &&
      playerTwoCurrentStamina > playerTwoSpeed
    ) {
      if (playerTwoSpeed > playerOneSpeed) {
        var choices = gadFly(playerOne);
        var type = false;
      } else if (playerOneSpeed > playerTwoSpeed) {
        var choices = crane(playerOne);
        var type = playerTwoArmorWeight > 45 ? false : true;
      } else {
        var choices = gadFly(playerOne);
        var type = false;
      }
    } else {
      var choices = gadFly(playerOne);
      var type = false;
    }
  } else if (playerOneCurrentStamina > playerOneSpeed) {
    if (playerTwoCurrentStamina < playerTwoSpeed) {
      if (playerTwoSpeed > playerOneSpeed) {
        var choices = gadFly(playerOne);
        var type = false;
      } else if (playerOneSpeed > playerTwoSpeed) {
        var choices = crane(playerOne);
        var type = playerTwoArmorWeight > 45 ? false : true;
      } else {
        var choices = bee(playerOne);
        var type = playerTwoArmorWeight > 13 ? false : true;
      }
    } else if (playerTwoSpeed > playerOneSpeed) {
      var choices = gadFly(playerOne);
      var type = false;
    } else if (playerOneSpeed > playerTwoSpeed) {
      var choices = bull(playerOne);
      var type = true;
    } else {
      var choices = crane(playerOne);
      var type = playerTwoArmorWeight > 45 ? false : true;
    }
  } else if (playerTwoMaxStamina < playerTwoStamina) {
    var choices = bull(playerOne);
    var type = true;
  } else if (playerOneCurrentStamina < 0) {
    var choices = gadFly(playerOne);
    var type = false;
  } else if (
    playerOneCurrentStamina > playerOneSpeed &&
    playerTwoCurrentStamina > playerTwoSpeed
  ) {
    var choices = bee(playerOne);
    var type = playerTwoArmorWeight > 13 ? false : true;
  } else if (playerTwoCurrentStamina < 0) {
    var choices = bull(playerOne);
    var type = true;
  } else if (playerTwoSpeed > playerOneSpeed) {
    var choices = gadFly(playerOne);
    var type = false;
  } else if (playerOneSpeed > playerTwoSpeed) {
    var choices = crane(playerOne);
    var type = playerTwoArmorWeight > 45 ? false : true;
  } else {
    var choices = bee(playerOne);
    var type = playerTwoArmorWeight > 13 ? false : true;
  }

  // Make sure the minimum attackSpeed for Heavy Weapons is 3. Otherwise, if total speed < 3, attackSpeed = 0.
  if (playerOneWeaponWeight && choices.attackSpeed < 3) {
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
