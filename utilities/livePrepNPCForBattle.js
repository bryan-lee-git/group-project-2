var Player = require("./playerConstructor");

module.exports = function prepNPCforBattle(character, classes) {
  var player = new Player(
    character.name,
    character.male,
    character.strength,
    character.speed,
    character.stamina,
    character.skill,
    character.image
  );

  let {
    lightWeapons,
    mediumWeapons,
    heavyWeapons,
    lightArmor,
    mediumArmor,
    heavyArmor
  } = classes;
console.log(`Prepping the NPC, here's the lightWeapons: ${lightWeapons}, mediumWeapons: ${mediumWeapons}, and heavyWeapons: ${heavyWeapons}.`)
  console.log(`here's the preliminary character: `, player);
  //Set primary and secondary weapons
  var weapon = {};

  if (player.strength > 15) {
    weapon = heavyWeapons[random(heavyWeapons)];
  } else if (player.strength < 13) {
    weapon = lightWeapons[random(lightWeapons)];
  } else {
    weapon = mediumWeapons[random(mediumWeapons)];
  }

  player.primaryWeapon = {
    name: weapon.name,
    damage: weapon.damage,
    weight: weapon.weight
  };

  // Set Armor
  let armor = {};

  if (player.strength > 15) {
    if (heavyArmor.length > 0) {
      armor = heavyArmor[random(heavyArmor)];
    }
  } else if (player.strength < 12) {
    armor = lightArmor[random(heavyArmor)];
  } else {
    armor = mediumArmor[random(mediumArmor)];
  }

  //console.log(`here's the armor we're loading: `, armor);
  player.armor = {
    type: armor.name,
    strength: armor.armor,
    weight: armor.weight
  };

  //Set shield
  if (!heavyWeapons.includes(player.primaryWeapon)) {
    player.armor.shield = true;
  }

  console.log(`Here's the newly created player: `, player);

  function random(array) {
    return Math.floor(Math.random() * array.length);
  }

  return player;
};
