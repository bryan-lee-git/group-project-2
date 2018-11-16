module.exports = function buildMarketClasses(marketResult) {
  var market = JSON.parse(JSON.stringify(marketResult));
  //console.log(`I found the market that belongs to this arena `, market);
  var lightWeapons = [];
  var mediumWeapons = [];
  var heavyWeapons = [];
  var lightArmor = [];
  var mediumArmor = [];
  var heavyArmor = [];

  market.forEach(item => {
    if (item.damage) {
      if (item.weight < 3) {
        lightWeapons.push(item);
      } else if (item.weight > 2 && item.weight < 6) {
        mediumWeapons.push(item);
      } else {
        heavyWeapons.push(item);
      }
    } else {
      if (item.weight < 14) {
        lightArmor.push(item);
      } else if (item.weight > 13 && item.weight < 45) {
        mediumArmor.push(item);
      } else {
        heavyArmor.push(item);
      }
    }
  });
  console.log(`Here's the light weapons: `, lightWeapons);
  console.log(`Here's the medium weapons: `, mediumWeapons);
  console.log(`Here's the heavy weapons: `, heavyWeapons);
  console.log(`Here's the light armors: `, lightArmor);
  console.log(`Here's the medium armors: `, mediumArmor);
  console.log(`Here's the heavy armors: `, heavyArmor);

  const classes = {
    lightWeapons: lightWeapons,
    mediumWeapons: mediumWeapons,
    heavyWeapons: heavyWeapons,
    lightArmor: lightArmor,
    mediumArmor: mediumArmor,
    heavyArmor: heavyArmor
  };
  return classes;
};
