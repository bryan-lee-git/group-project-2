var request = require("request");
var db = require("../models");
var dnd = "http://www.dnd5eapi.co/api/equipment/";

for (var i = 1; i < 51; i++) {
  console.log(`${dnd}${i}`);
  request(`${dnd}${i}`, function(err, response, body) {
    var target = JSON.parse(body);
    console.log(target.equipment_category);
    if (target.equipment_category === "Weapon") {
      if (target.weapon_range === "Melee") {
        if (target.name !== "Lance") {
          var item = {
            name: target.name,
            damage: target.damage.dice_count * target.damage.dice_value,
            cost: target.cost.quantity*60,
            costType: target.cost.unit,
            weight: target.weight
          };
          if (target.weight <= 5) {
            item.weight = true;
          } else {
            item.weight = null;
          }
          db.Weapons.create(item).then(function(res) {
            console.log(`${item.name} added to the weapons table`);
          });
        }
      }
    } else if (target.equipment_category === "Armor") {
      var item = {
        name: target.name,
        strength: target.armor_class.base,
        cost: target.cost.quantity*20,
        costType: target.cost.unit,
        weight: target.weight
      };
      db.Armor.create(item).then(function(res) {
        console.log(`${item.name} added to the armor table`)
      });
    }
  });
}
