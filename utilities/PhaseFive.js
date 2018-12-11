var PhaseSix = require("./PhaseSix");

module.exports = function phaseFive(playerOne, playerTwo, round) {
  //console.log(
  //  `${playerOne.name} at the start of phase five is `,
   // JSON.parse(JSON.stringify(playerOne))
 // );
  //console.log(
   // `${playerTwo.name} at the start of phase five is `,
  //  JSON.parse(JSON.stringify(playerTwo))
 // );
  //
  //  Resolve Attacks
  //
  //  foreach player, the player with the greatest currentSpeed is selected to attack first.

  var count1 = playerOne.attacks.length;
  var count2 = playerTwo.attacks.length;

  if (playerOneSpeed > playerTwoSpeed) {
    
      attackOrder(playerOne, playerTwo);
    
  } else {
    
      attackOrder(playerTwo, playerOne);
    
  }
  console.log(`the number of attacks in the round is ${count1 + count2}.`);

  var { playerOne, playerTwo} = PhaseSix(playerOne, playerTwo, count1 + count2, round);

  function d20() {
    let result = Math.floor(Math.random() * 19) + 1;
    console.log(`d20 result is ${result}`);
    return result;
  }

  function attackOrder(first, second) {
    var number = 0;
   
    console.log(`${first.name} attacks is `, first.attacks);
    console.log(`${first.name} has ${first.attacks.length} attack(s).`);

    let { count, wound, hit } = resolveAttack(first, second);
   
    number = number + count;

    if (wound === 0) {
      console.log(`${second.name} attacks is `, second.attacks);
      console.log(`${second.name} has ${second.attacks.length}.`);

      let { count, wound, hit } = resolveAttack(second, first);

      number = number + count;

      if (wound > 0) {
        first.currentSpeed = 0;
      }
    }
  }

  function resolveAttack(first, second) {
    var wound = 0;
    var count = 0;
    var hit = false;
    for (let i = 0; i < first.attacks.length; i++) {
      count = i + 1;
      var targetToHit = 10;

      console.log(`from inside resolveAttack inside phaseFive, here is the value of ${second.name}'s shield value: ${second.armor.shield} `,typeof second.armor.shield);
      console.log(`from inside resolveAttack inside phaseFive, here is the value of ${second.name}'s defenseSpeed: ${second.defenseSpeed} `);
      
      if (second.armor.shield) {
        targetToHit =
          10 +
          second.defenseSpeed +
          2 +
          (first.attacks[i].attack.attackType ? 0 : 5);
      } else {
        targetToHit =
          10 +
          second.defenseSpeed +
          (first.attacks[i].attack.attackType ? 0 : 5);
      }

      console.log(`Number to hit ${second.name} = ${targetToHit}.`);

      var damage = 0;
      
      second.hit = hit;

      console.log(
        `${first.name} attackSpeed = ${first.attacks[i].attack.attackSpeed}`
      );

      if (first.attacks[i].attack.attackSpeed > 0) {
        var toHitRoll = d20() + first.skill;
      } else {
        var toHitRoll = 0;
      }
      
      console.log(`${first.name} to hit roll is ${toHitRoll}.`);

      if (toHitRoll === 0 ) {
        console.log(`No attack for ${first.name}.`)
      } else {
        if (toHitRoll > targetToHit) {
          hit = true;
          second.hit = hit;
          console.log(`${first.name} HIT ${second.name}!`);
          console.log(
            `${first.name} attack type is ${
              first.attacks[i].attack.attackType ? "Base" : "Attack Weak Spot"
            }`
          );
          console.log(`${first.name} strength is ${first.strength}`);
          console.log(
            `${first.name} primary weapon damage is ${first.weapon.damage}`
          );
          if (first.attacks[i].attack.attackType) {
            damage =
              (Math.floor((first.strength / 5) + 1) *
                first.attacks[i].attack.attackSpeed +
              first.weapon.damage);
          } else {
            damage =
              2 *
              ((Math.floor(first.strength / 5) + 1) *
                first.attacks[i].attack.attackSpeed +
                first.weapon.damage);
          }
  
          console.log(
            `Damage from ${first.name} against ${second.name} is ${damage}.`
          );
          if (damage - second.armor.strength - second.strength > 0) {
            wound = damage - second.armor.strength - second.strength;
            second.wounds = second.wounds + wound;
            console.log(`${second.name} was wounded for ${second.wounds}!`);
            return { count, wound, hit };
          }
        }
      }
      
    }
    return { count, wound, hit };
  }
  

  return { playerOne, playerTwo}
};
