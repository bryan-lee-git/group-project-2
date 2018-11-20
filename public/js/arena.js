$("#player-stats").hide();
$("#player-gear").hide();
$("#npc-stats").hide();

$("#player-stats-btn").on("click", () => {
  $("#player-stats").slideToggle(300);
  $("#player-gear").slideUp(300);
});

$("#player-gear-btn").on("click", () => {
  $("#player-stats").slideUp(300);
  $("#player-gear").slideToggle(300);
});

$("#npc-stats-btn").on("click", () => {
  $("#npc-stats").slideToggle(300);
});

$(document).ready(function() {
  var rounds = 1;

  var game = {
    user: {
      id: $("#user-hook").val(),
      name: $("#user-name").val(),
      stamina: $("#user-stamina-span").val(),
      strength: $("#user-strength-span").val(),
      speed: $("#user-speed-span").val(),
      skill: $("#user-skill-span").val(),
      currentSpeed: $("#user-current-speed").val(),
      currentStamina: $("#user-current-stamina").val(),
      maxStamina: $("#user-max-stamina").val(),
      attacks: [],
      weapon: {
        name: $("#user-weapon-name").val(),
        statIncrease: $("#user-weapon-damage").val(),
        weight: $("#user-weapon-weight").val()
      },
      armor: {
        name: $("#user-armor-name").val(),
        statIncrease: $("#user-armor-strength").val(),
        weight: $("#user-armor-weight").val(),
        shield: $("#user-shield").val()
      }
    },
    npc: {
      id: $("#npc-hook").val(),
      name: $("#npc-name").val(),
      stamina: $("#opponent-stamina-span").val(),
      strength: $("#opponent-strength-span").val(),
      speed: $("#opponent-speed-span").val(),
      skill: $("#opponent-skill-span").val(),
      currentSpeed: $("#npc-current-speed").val(),
      currentStamina: $("#npc-current-stamina").val(),
      maxStamina: $("#npc-max-stamina").val()
    },
    attacks: [],
    weapon: {
      name: "",
      statIncrease: 0,
      weight: false
    },
    armor: {
      name: "",
      statIncrease: 0,
      weight: 0,
      shield: false
    }
  };

  $("#start-battle").on("click", event => {
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: `/api/battles/game/1`,
      data: game
    }).then(results => {
      rounds++;
      console.log(results);
    });
  });
});
