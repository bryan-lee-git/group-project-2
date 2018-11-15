var request = require("request");
var db = require("../models");

async function autoNPC(arenaID) {
  var gender = Math.random() < 0.75 ? true : false;
  var strength = 5 + random() + random() + random();
  var stamina = 5 + random() + random() + random();
  var speed = random() + random();
  var skill = random();
  const maleImages = [
    "/img/game-character-images/Alexander.svg",
    "/img/game-character-images/Arthur.svg",
    "/img/game-character-images/Attila.svg",
    "/img/game-character-images/Ciniod.svg",
    "/img/game-character-images/Crixus.svg",
    "/img/game-character-images/Lancelot.svg",
    "/img/game-character-images/Maximus.svg",
    "/img/game-character-images/Miyamoto.svg",
    "/img/game-character-images/Nagato.svg",
    "/img/game-character-images/Narcissus.svg",
    "/img/game-character-images/Quin.svg",
    "/img/game-character-images/Sparticus.svg",
    "/img/game-character-images/lee-jun.svg",
    "/img/game-character-images/tigris.svg"
  ];
  const femaleImages = [
    "/img/game-character-images/Brynhild.svg",
    "/img/game-character-images/Caterina.svg",
    "/img/game-character-images/Hilde.svg",
    "/img/game-character-images/Hachette.svg",
    "/img/game-character-images/Joan-two.svg",
    "/img/game-character-images/Lagertha.svg",
    "/img/game-character-images/Matilda.svg",
    "/img/game-character-images/Nesdahlia.svg",
    "/img/game-character-images/Saphire.svg"
  ];

  function random() {
    return Math.floor(Math.random() * 5 + 1);
  }

  function genderPicker() {
    return gender ? "m" : "f";
  }

  function pickImage(gender) {
    return gender
      ? maleImages[Math.floor(Math.random() * maleImages.length - 1)]
      : femaleImages[Math.floor(Math.random() * femaleImages.length - 1)];
  }

  var url = `http://behindthename.com/api/random.json?number=1&usage=${origin()}&gender=${genderPicker()}&key=ja756845453`;

  console.log(`url is: ${url}`);

  request(url, (err, response, body) => {
    if (err) throw err;
    var target = JSON.parse(body);
    console.log(`body is `, target);
    character = {
      name: target.names[0],
      male: gender,
      strength: strength,
      stamina: stamina,
      speed: speed,
      skill: skill,
      image: pickImage(gender),
      ArenaId: arenaID
    };

    db.NPC.create(character).then(res => {
      console.log(`${character.name} added to the NPC table`);
      var clean = JSON.stringify(res);
      //console.log(`clean response is ${clean}`);
      //return clean;
    });
  });

  function origin() {
    var rand = Math.floor(Math.random() * 100);
    console.log(`rand is ${rand}`);

    if (rand < 21) {
      return "roma";
    } else if (20 < rand && rand < 41) {
      return "grea";
    } else if (40 < rand && rand < 61) {
      return "afr";
    } else if (60 < rand && rand < 71) {
      return "anci";
    } else if (70 < rand && rand < 76) {
      return "cop";
    } else if (75 < rand && rand < 81) {
      return "gal";
    } else if (80 < rand && rand < 86) {
      return "gmca";
    } else if (85 < rand && rand < 91) {
      return "heb";
    } else if (90 < rand && rand < 96) {
      return "occ";
    } else if (95 < rand && rand < 101) {
      return "scaa";
    } else {
      return "roma";
    }
  }
}

module.exports = autoNPC;
