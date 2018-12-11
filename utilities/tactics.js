function bee(player) {
  //console.log(`from bee inside tactics.js, here's player`, player);
  const attackSpeed = Math.floor(player.currentSpeed / 2);
  const defenseSpeed = player.currentSpeed - attackSpeed;
  const speedChoices = {
    attackSpeed: attackSpeed,
    defenseSpeed: defenseSpeed
  };
  console.log(`inside tactics, ${player.name} has chosen bee.`);
  return speedChoices;
}

function bull(player) {
  //console.log(`from bull inside tactics.js, here's player`, player);
  const attackSpeed = player.currentSpeed;
  const defenseSpeed = 0;
  const speedChoices = {
    attackSpeed: attackSpeed,
    defenseSpeed: defenseSpeed
  };
  console.log(`inside tactics, ${player.name} has chosen bull.`);
  return speedChoices;
}

function turtle(player) {
  //console.log(`from turtle inside tactics.js, here's player`, player);
  const attackSpeed = 0;
  const defenseSpeed = player.currentSpeed;
  const speedChoices = {
    attackSpeed: attackSpeed,
    defenseSpeed: defenseSpeed
  };
  console.log(`inside tactics, ${player.name} has chosen turtle.`);
  return speedChoices;
}

function gadfly(player) {
  

  const attackSpeed = 1;
  const defenseSpeed = player.currentSpeed - attackSpeed;
  const speedChoices = {
    attackSpeed: attackSpeed,
    defenseSpeed: defenseSpeed
  };
  console.log(`inside tactics, ${player.name} has chosen gadfly.`);
  console.log(`${player.name}'s currentSpeed is ${player.currentSpeed}.`)
  console.log(`from gadfly inside tactics.js, here's ${player.name}'s defenseSpeed: ${player.defenseSpeed}`);
  console.log(`Speedchoices for ${player.name} are ${speedChoices}.`)
  return speedChoices;
}

function panda(player) {
  //console.log(`from panda inside tactics.js, here's player`, player);
  const attackSpeed = Math.floor(player.currentSpeed / 3);
  const defenseSpeed = player.currentSpeed - attackSpeed;
  const speedChoices = {
    attackSpeed: attackSpeed,
    defenseSpeed: defenseSpeed
  };
  console.log(`inside tactics, ${player.name} has chosen panda.`);
  return speedChoices;
}
function crane(player) {
  //console.log(`from crane inside tactics.js, here's player`, player);
  const attackSpeed = Math.floor(player.currentSpeed / 3) * 2;
  const defenseSpeed = player.currentSpeed - attackSpeed;
  const speedChoices = {
    attackSpeed: attackSpeed,
    defenseSpeed: defenseSpeed
  };
  console.log(`inside tactics, ${player.name} has chosen crane.`);
  return speedChoices;
}

module.exports = { bee, bull, gadfly, turtle, panda, crane };
