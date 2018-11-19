var request = require("request");
var db = require("../models");

var Weapon = require("../models/Weapons");
var Armor = require("../models/Armor");

var dnd = "http://dnd5eapi.co/api/equipment/";

for (let index = 1; index < 51; index++) {
  request(dnd + index, (err, response, body) => {
    var target = JSON.parse(body);
    console.log(target.equipment_category);
    if (target.equipment_category === "Weapon") {
      if (target.weapon_range === "Melee") {
        if (target.name !== "Lance") {
          const item = {
            name: target.name,
            damage: target.damage.dice_count * target.damage.dice_value,
            cost: target.cost.quantity*60,
            costType: target.cost.unit,
            weight: false
          };
          if (target.weight <= 5) {
            item.weight = true;
          } else {
            item.weight = null;
          }
          db.Weapons.create(item).then(res =>
            console.log(`${item.name} added to the weapons table`)
          );
        }
      }
    } else if (target.equipment_category === "Armor") {
      const item = {
        name: target.name,
        strength: target.armor_class.base,
        cost: target.cost.quantity*20,
        costType: target.cost.unit,
        weight: target.weight
      };
      db.Armor.create(item).then(res =>
        console.log(`${item.name} added to the armor table`)
      );
    }
  });
}
