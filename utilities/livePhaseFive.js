var livePhaseSix = require("./livePhaseSix");

module.exports = function livePhaseFive(game) {
  //
  //  Resolve Attacks
  //
  //  foreach player, the player with the greatest currentSpeed is selected to attack first.

  console.log(game);
  const playerOne = {
    name:  game["user[name]"],
    attackFirst: game["user[attacks]"][0].attack.attackSpeed,
    attackSecond: game["user[attacks]"][1].attack.attackSpeed,

  }
  
 
  console.log(`${playerOne.name} attacks length is ${playerOne.attackFirst}`);
 
  const playerTwo = {
    name: game["npc[name]"],
    attackFirst: game["npc[attacks]"][0].attack.attackSpeed,
    attackSecond: game["npc[attacks]"][1].attack.attackSpeed,
    attacks: game["npc[attacks]"].length
  }

  console.log(`${playerTwo.name} first attack attackSpeed= ${playerTwo.attackFirst}, ${playerTwo.attackSecond} and length = ${playerTwo.attacks}`)
  var count1 = game["user[attacks][length]"];
  var count2 = game["npc[attacks][length]"];

  if (game["npc[attacks[0]][attack][attackSpeed]"] > game["user[attacks[0]][attack][attackSpeed]"]) {

    attackOrder(game["npc"], game["user"]);
  } else {attackOrder(game["user"], game["npc"])}
  

  livePhaseSix(game, count1 + count2);

  function d20() {
    let result = Math.floor(Math.random() * 19) + 1;
    console.log(`d20 result is ${result}`);
    return result;
  }

  function attackOrder(first, second) {
    var number = 0;
    console.log(`first is `, first)
    console.log(`${first["name"]} attacks is `, first["attacks"]);
    console.log(`${first["name"]} has ${first["attacks"].length} attack(s).`);

    let { count, wound } = resolveAttack(first, second);

    number = number + count;

    if (wound === 0) {
      console.log(`${second.name} attacks is `, second.attacks);
      console.log(`${first.name} has ${first.attacks.length}.`);

      let { count, wound } = resolveAttack(second, first);

      number = number + count;

      if (wound > 0) {
        first.currentSpeed = 0;
      }
    }
  }

  function resolveAttack(first, second) {
    var wound = 0;
    var count = 0;
    for (let i = 0; i < first[attacks].length; i++) {
      count = i + 1;
      var targetToHit = 10;
      if (second[armor][shield]) {
        targetToHit =
          10 +
          first.defenseSpeed +
          2 +
          (first.attacks[i].attack.attackType ? 0 : 5);
      } else {
        targetToHit =
          10 +
          first.defenseSpeed +
          (first.attacks[i].attack.attackType ? 0 : 5);
      }

      console.log(`Number to hit ${second.name} = ${targetToHit}.`);

      var damage = 0;
      var toHitRoll = d20() + first.skill;
      console.log(
        `\n${first.name} attackSpeed = ${first.attacks[i].attack.attackSpeed}`
      );
      console.log(`\n${first.name} to hit roll is ${toHitRoll}.`);
      if (toHitRoll > targetToHit) {
        console.log(`\n${first.name} HIT ${second.name}!`);
        console.log(
          `\n${first.name} attack type is ${
            first.attacks[i].attack.attackType ? "Base" : "Attack Weak Spot"
          }`
        );
        console.log(`${first.name} strength is ${first.strength}`);
        console.log(
          `\n${first.name} primary weapon damage is ${first.primaryWeapon.damage}`
        );
        damage =
        (Math.floor(first.strength / 5) + 1) *
          first.attacks[i].attack.attackSpeed +
        first.primaryWeapon.damage;
        console.log(
          `\nDamage from ${first.name} against ${second.name} is ${damage}.`
        );

        if (first.attacks[i].attack.attackType) {
          
          if (damage - second.armor.strength - second.strength > 0) {
              wound = damage - second.armor.strength - second.strength;
              second.wounds = wound;
              console.log(`\n${second.name} was wounded for ${second.wounds}!`);
        } else {
            if (damage - (Math.floor(second.strength / 2) +1) > 0) {
                wound = damage - (Math.floor(second.strength / 2) + 1);
                second.wounds = wound;
                console.log(`\n${second.name} was wounded for ${second.wounds}!`);
            }
         
          }
        }
      }
    }
  return { count, wound };
  };
};
