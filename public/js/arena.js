$("#player-stats").hide();
$("#player-gear").hide();
$("#npc-stats").hide();
$("#player-current-stats").hide();
$("#npc-current-stats").hide();

$("#player-stats-btn").on("click", () => {
  $("#player-stats").slideToggle(300);
  $("#player-gear").slideUp(300);
  $("#player-current-stats").slideUp(300);
});

$("#player-gear-btn").on("click", () => {
  $("#player-stats").slideUp(300);
  $("#player-current-stats").slideUp(300);
  $("#player-gear").slideToggle(300);
});

$("#player-current-stats-btn").on("click", () => {
  $("#player-stats").slideUp(300);
  $("#player-current-stats").slideToggle(300);
  $("#player-gear").slideUp(300);
});

$("#npc-stats-btn").on("click", () => {
  $("#npc-stats").slideToggle(300);
  $("#npc-current-stats").slideUp(300);
});

$("#npc-current-stats-btn").on("click", () => {
  $("#npc-current-stats").slideToggle(300);
  $("#npc-stats").slideUp(300);
});

$(document).ready(function() {
  var rounds = 1;

  $("#start-battle").on("click", event => {
    event.preventDefault();
    var game = {
      round: rounds,
      user: {
        id: $("#user-hook").html(),
        name: $("#user-name").html(),
        stamina: $("#user-stamina-span").html(),
        strength: $("#user-strength-span").html(),
        speed: $("#user-speed-span").html(),
        skill: $("#user-skill-span").html(),
        currentSpeed: $("#user-speed-span").html(),
        currentStamina: $("#user-stamina-span").html(),
        maxStamina: $("#user-stamina-span").html(),
        attacks: [],
        weapon: {
          name: $("#user-weapon-name").html(),
          statIncrease: $("#user-weapon-damage").html(),
          weight: $("#user-weapon-weight").html()
        },
        armor: {
          name: $("#user-armor-name").html(),
          statIncrease: $("#user-armor-strength").html(),
          weight: $("#user-armor-weight").html(),
          shield: $("#user-shield").html()
        }
      },
      npc: {
        id: $("#npc-hook").html(),
        name: $("#npc-name").html(),
        stamina: $("#opponent-stamina-span").html(),
        strength: $("#opponent-strength-span").html(),
        speed: $("#opponent-speed-span").html(),
        skill: $("#opponent-skill-span").html(),
        currentSpeed: $("#opponent-speed-span").html(),
        currentStamina: $("#opponent-stamina-span").html(),
        maxStamina: $("#opponent-stamina-span").html()
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

  
    $.post(`/api/battles/game/1`, game, results => {
      rounds++;
      console.log(results);
      var clean = JSON.stringify(results)
      var playerOneResult = `The winner of the battle was...${JSON.stringify(results.winner)}`;
      $("#log-content").append(playerOneResult)
    })
      
   
  });
});
