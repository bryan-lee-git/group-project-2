var { bull, bee, turtle, gadfly, panda, crane } = require("./tactics");

function liveUserChooseTactic2(playerOne, userTactic) {
  switch (userTactic) {
    case "bull":
      choices = bull(playerOne);
      break;
    case "bee":
      choices = bee(playerOne);
      break;
    case "gadfly":
      choices = gadfly(playerOne);
      break;
    case "panda":
      choices = panda(playerOne);
      break;
    case "crane":
      choices = crane(playerOne);
      break;
    default:
      choices = bull(playerOne);
  }

  // Make sure the minimum attackSpeed for Heavy Weapons is 3. Otherwise, if total speed < 3, attackSpeed = 0.
  if (playerOne.weapon.weight > 5 && choices.attackSpeed < 3) {
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

  return { choices };
}

module.exports = liveUserChooseTactic2;
