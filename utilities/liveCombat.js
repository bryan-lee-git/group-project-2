var livePhaseTwo = require("./livePhaseTwo");

var livePhaseFour = require("./livePhaseFour");

module.exports = combat = (Arena, game) => {
  var battleResults = {
    user: {
      id: game.user.id,
      name: game.user.name,
      stamina: game.user.stamina,
      strength: game.user.strength,
      speed: game.user.speed,
      skill: game.user.skill,
      currentSpeed: game.user.currentSpeed,
      currentStamina: game.user.currentStamina,
      maxStamina: game.user.maxStamina,
      defenseSpeed: game.user.defenseSpeed,
      attacks: [],
      weapon: {
        name: game.user.weapon.name,
        statIncrease: game.user.weapon.statIncrease,
        weight: false
      },
      armor: {
        name: game.user.armor.name,
        statIncrease: game.user.armor.statIncrease,
        weight: game.user.armor.weight,
        shield: game.user.armor.shield
      }
    },
    npc: {
      id: game.npc.id,
      name: game.npc.name,
      stamina: game.npc.stamina,
      strength: game.npc.strength,
      speed: game.npc.speed,
      skill: game.npc.skill,
      currentSpeed: game.npc.currentSpeed,
      currentStamina: game.npc.currentStamina,
      maxStamina: game.npc.maxStamina,
      defenseSpeed: game.npc.defenseSpeed,
      attacks: [],
      weapon: {
        name: "",
        statIncrease: 0,
        weight: false
      },
      armor: {
        name: "",
        statIncrease: 0,
        weight: 12,
        shield: false
      }
    },
    winner: ""
  };

  console.log(`Inside the combat function. Our Arena is `, Arena);
  //phaseOne(Arena, playerOne, playerTwo);

  var attacks = livePhaseFour(game);

  var gameOn = livePhaseTwo(game);

  if (!gameOn) {
    battleResults.winner =
      playerOne.currentStamina > 0 ? playerOne.name : playerTwo.name;

    console.log(
      `The winner of the battle between ${playerOne.name} and ${
        playerTwo.name
      } is ${battleResults.winner}.`
    );
    console.log(`Battle lasted ${battleResults.rounds} rounds.`);
  }

  return battleResults;
};
