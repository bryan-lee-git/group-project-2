var PhaseSix = require("./PhaseSix");

module.exports = function phaseFive(playerOne, playerTwo) {
  console.log(
    `playerOne at the start of phase five is `,
    JSON.parse(JSON.stringify(playerOne))
  );
  console.log(
    `playerTwo at the start of phase five is `,
    JSON.parse(JSON.stringify(playerTwo))
  );
  //
  //  Resolve Attacks
  //
  //  foreach player, the player with the greatest currentSpeed is selected to attack first.

  if (playerOneSpeed > playerTwoSpeed) {
    if (playerOne.attacks[0].attack.attackSpeed > 0) {
      var count1 = attack(playerOne, playerTwo);
    }
    if (playerTwo.attacks[0].attack.attackSpeed > 0) {
      var count2 = attack(playerTwo, playerOne);
    }
  } else {
    if (playerTwo.attacks[0].attack.attackSpeed > 0) {
      var count2 = attack(playerTwo, playerOne);
    }
    if (playerOne.attacks[0].attack.attackSpeed > 0) {
      var count1 = attack(playerOne, playerTwo);
    }
  }
  console.log(`the number of attacks in the round is ${count1 + count2}.`);
  PhaseSix(playerOne, playerTwo, count1 + count2);

  //
  //  foreach attack in attackingPlayer.attacks ...
  //  Need a BIG BUTTON that says something like "ATTACK!". onClick of that button, fire off a Math.random that outputs a number from 1 - 20.
  //  Calculate toHitResult = roll + player skill.
  //  If (toHitResult > toHitTarget) { var damage = oppositePlayer.takeDamage(attackingPlayer.doDamage(attack)) }
  //
  // var netDamage = damage - oppositePlayer.armor.strength *** this may be zero if the Attack Weak Point attack type ignores armor ****
  //    var wound = netDamage - oppositePlayer.strengthStat
  //    if (wound > 0) { add wound to oppositePlayer.wounds}
  //    if (wound > 0) { skip the oppositePlayers next turn...if that turn is in this phase, skip it. If it is in the next round, then we need to set the wounded player's currentSpeed to zero. That way, that player cannot act in the next round.}
  // After both players have resolved all attacks, move on to PhaseSix.

  function d20() {
    let result = Math.floor(Math.random() * 19) + 1;
    console.log(`d20 result is ${result}`);
    return result;
  }

  function attack(first, second) {
    var count = 0;
    var toHitPlayerOne = 10;
    var toHitPlayerTwo = 10;
    if (playerOne.armor.shield) {
      toHitPlayerOne = 10 + playerTwo.defenseSpeed + 2;
    } else {
      toHitPlayerOne = 10 + playerTwo.defenseSpeed;
    }
    console.log(`Number to hit ${playerOne.name} = ${toHitPlayerOne}.`);

    if (playerTwo.armor.shield) {
      toHitPlayerTwo = 10 + playerOne.defenseSpeed + 2;
    } else {
      toHitPlayerTwo = 10 + playerOne.defenseSpeed;
    }

    console.log(`Number to hit ${playerTwo.name} = ${toHitPlayerTwo}.`);

    console.log(`${first.name} attacks is `, first.attacks);
    for (let i = 0; i < first.attacks.length; i++) {
      count++;
      var damage = 0;
      var toHitRoll = d20() + first.skill;
      console.log(
        `${first.name} attackSpeed = ${first.attacks[i].attack.attackSpeed}`
      );
      console.log(`${first.name} to hit roll is ${toHitRoll}.`);
      if (toHitRoll > toHitPlayerTwo) {
        console.log(`${first.name} HIT ${second.name}!`);
        console.log(
          `${first.name} attack type is ${
            first.attacks[i].attack.attackType ? "Base" : "Attack Weak Spot"
          }`
        );
        console.log(`${first.name} strength is ${first.strength}`);
        console.log(
          `${first.name} primary weapon damage is ${first.primaryWeapon.damage}`
        );
        if (first.attacks[i].attack.attackType) {
          damage =
            Math.floor(first.strength / 5) *
              first.attacks[i].attack.attackSpeed +
            first.primaryWeapon.damage;
        } else {
          damage =
            2 *
            (Math.floor(first.strength / 5) *
              first.attacks[i].attack.attackSpeed +
              first.primaryWeapon.damage);
        }

        console.log(
          `Damage from ${first.name} against ${second.name} is ${damage}.`
        );
        if (damage - second.armor.strength - second.strength > 0) {
          second.wounds = damage - second.armor.strength - second.strength;
          console.log(`${second.name} was wounded for ${second.wounds}!`);
          return count;
        }
      }
    }

    console.log(`${second.name} attacks is `, second.attacks);
    for (let i = 0; i < second.attacks.length; i++) {
      count++;
      damage = 0;
      var toHitRoll = d20() + second.skill;
      console.log(
        `${second.name} attackSpeed = ${second.attacks[i].attack.attackSpeed}`
      );
      console.log(`${second.name} to hit roll is ${toHitRoll}.`);
      if (toHitRoll > toHitPlayerOne) {
        console.log(`${second.name} HIT ${first.name}!`);
        console.log(
          `${second.name} attack type is ${
            second.attacks[i].attack.attackType ? "Base" : "Attack Weak Spot"
          }`
        );
        console.log(`${second.name} strength is ${second.strength}`);
        console.log(
          `${second.name} primary weapon damage is ${
            second.primaryWeapon.damage
          }`
        );
        if (second.attacks[i].attack.attackType) {
          damage =
            Math.floor(second.strength / 5) *
              second.attacks[i].attack.attackSpeed +
            second.primaryWeapon.damage;
        } else {
          damage =
            2 *
            (Math.floor(second.strength / 5) *
              second.attacks[i].attack.attackSpeed +
              second.primaryWeapon.damage);
        }

        console.log(
          `Damage from ${second.name} against ${first.name} is ${damage}.`
        );
        if (damage - first.armor.strength - first.strength > 0) {
          first.wounds = damage - first.armor.strength - first.strength;
          first.currentSpeed = 0;
          console.log(`${first.name} was wounded for ${first.wounds}!`);
        }
      }
    }
    return count;
  }
};
