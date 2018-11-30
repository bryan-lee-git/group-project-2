var { bull, bee, turtle, gadfly, panda, crane } = require("./tactics");

function liveUserChooseTactic(playerOne, playerTwo, userTactic) {
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
    choice = bull(playerOne)
    
}
var type = false;

  if (playerOne.currentStamina <= 0 && playerOne.maxStamina > 0) {
    
    type = false;
  }

  if (playerOne.strength > playerTwo.strength) {
    if (playerTwo.maxStamina < playerTwo.stamina) {
     
      type = true;
    } else if (playerOne.currentSpeed > playerTwo.speed) {
      
      type = playerTwo.armor.weight === 0 ? true : false;
    } else {
      
      type = false;
    }
  } else if (playerTwo.strength > playerOne.strength) {
    if (playerTwo.maxStamina < playerTwo.stamina) {
      
      type = playerTwo.armor.weight > 45 ? false : true;
    } else if (
      playerOne.currentStamina > playerOne.speed &&
      playerTwo.currentStamina > playerTwo.speed
    ) {
      if (playerTwo.speed > playerOne.speed) {
        
        type = false;
      } else if (playerOne.speed > playerTwo.speed) {
        
        type = playerTwo.armor.weight > 45 ? false : true;
      } else {
       
        type = false;
      }
    } else {
      
      type = false;
    }
  } else if (playerOne.currentStamina > playerOne.speed) {
    if (playerTwo.currentStamina < playerTwo.speed) {
      if (playerTwo.speed > playerOne.speed) {
        
        type = false;
      } else if (playerOne.speed > playerTwo.speed) {
       
        type = playerTwo.armor.weight > 45 ? false : true;
      } else {
        
        type = playerTwo.armor.weight > 13 ? false : true;
      }
    } else if (playerTwo.speed > playerOne.speed) {
     
      var type = false;
    } else if (playerOne.speed > playerTwo.speed) {
    
      type = true;
    } else {
     
      type = playerTwo.armor.weight > 45 ? false : true;
    }
  } else if (playerTwo.maxStamina < playerTwo.stamina) {
    
    type = true;
  } else if (playerOne.currentStamina < 0) {
   
    type = false;
  } else if (
    playerOne.currentStamina > playerOne.speed &&
    playerTwo.currentStamina > playerTwo.speed
  ) {
   
    type = playerTwo.armor.weight > 13 ? false : true;
  } else if (playerTwo.currentStamina < 0) {
   
    type = true;
  } else if (playerTwo.speed > playerOne.speed) {
   
    type = false;
  } else if (playerOne.speed > playerTwo.speed) {
    
    type = playerTwo.armor.weight > 45 ? false : true;
  } else {
    
    type = playerTwo.armor.weight > 13 ? false : true;
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
  console.log(
    `from inside chooseTactic, here's the ready to export type: `,
    type
  );
  return { choices, type };
}

module.exports = liveUserChooseTactic;
