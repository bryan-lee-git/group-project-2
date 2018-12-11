$("#player-stats").hide();
$("#player-gear").hide();
$("#npc-stats").hide();
$("#npc-gear").hide();
$("#billboard-container").hide();

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
  $("#npc-gear").slideUp(300);
});

$("#npc-gear-btn").on("click", () => {
  $("#npc-stats").slideUp(300);
  $("#npc-gear").slideToggle(300);
});


$(document).ready(function() {
  rounds = 1;
  userWounds = 0;
  npcWounds = 0;

  $("#user-current-speed").html($("#user-speed-span").html());
  $("#user-current-stamina").html($("#user-stamina-span").html());
  $("#user-max-stamina").html($("#user-stamina-span").html());
  $("#user-defense-speed").html(0);

  $("#npc-current-speed").html($("#opponent-speed-span").html());
  $("#npc-current-stamina").html($("#opponent-stamina-span").html());
  $("#npc-max-stamina").html($("#opponent-stamina-span").html());
  $("#npc-defense-speed").html(0);

  
  $(".fixed-action-btn").on("click", (event) => {
    event.preventDefault();

    var game = {
   
      user: {
        id: $("#user-hook").html(),
        name: $("#user-name").html(),
        stamina: $("#user-stamina-span").html(),
        strength: $("#user-strength-span").html(),
        speed: $("#user-speed-span").html(),
        skill: $("#user-skill-span").html(),
        wounds: 0,
        currentSpeed: $("#user-current-speed").html(),
        currentStamina: $("#user-current-stamina").html(),
        maxStamina:  $("#user-max-stamina").html(),
        defenseSpeed: $("#user-defense-speed").html(),
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
        wounds: 0,
        currentSpeed: $("#npc-current-speed").html(),
        currentStamina: $("#npc-current-stamina").html(),
        maxStamina: $("#npc-max-stamina").html(),
        defenseSpeed: $("#npc-defense-speed").html(),
      attacks: [],
      weapon: {
        name: $("#npc-weapon-name").html(),
        statIncrease: $("#npc-weapon-damage").html(),
        weight: $("#npc-weapon-weight").html()
      },
      armor: {
        name:  $("#npc-armor-name").html(),
        statIncrease: $("#npc-armor-strength").html(),
        weight: $("#npc-armor-weight").html(),
        shield: $("#npc-shield").html()
      }
    }
    };
    console.log(`the current round is ... ${rounds}`);

  $.post(`/api/battles/npc/tactic/${game.npc.id}`, game, npcTactic => {
    console.log(`the npc tactic is: `, npcTactic);

    game.npc.defenseSpeed = npcTactic.choices.defenseSpeed;

    console.log(`the data type for the npc defense speed is `,typeof game.npc.defenseSpeed)
      
    $("#npc-ready").html(`Attack Speed: ${npcTactic.choices.attackSpeed}\nAttack Type: ${npcTactic.type ? "Base" : "Weak Spot Attack"}`);

    $("#npc-defense-speed").html(game.npc.defenseSpeed);

    console.log(`${game.npc.name}'s defense speed is ${game.npc.defenseSpeed}.`);

      const userTactic = event.target.innerHTML;
      
      $.post(`/api/battles/user/tactic/${userTactic}`, game, userTacticResult => {
        console.log(`coming back from the api user choice, here's the results`, userTacticResult);
        var attackBundle = {
          round: rounds,
          gameData: game,
          userTactics: userTacticResult,
          npcTactics: npcTactic
        }
        $.post(`/api/battles/attacks`, attackBundle, roundResult => {
          console.log(`here's the result of round attacks: `, roundResult);

          userWounds = userWounds + roundResult.playerOne.wounds;
          npcWounds = npcWounds + roundResult.playerTwo.wounds;
          // Update user data to game object and to the screen


          game.user.maxStamina = game.user.stamina - userWounds;
          $("#user-max-stamina").html(game.user.maxStamina);
          console.log(`${game.user.name} maxStamina is ${game.user.maxStamina}.`);

          game.user.currentStamina = roundResult.playerOne.currentStamina;
          $("#user-current-stamina").html(game.user.currentStamina > game.user.maxStamina ? game.user.maxStamina : game.user.currentStamina);
          console.log(`${game.user.name} current stamina after round ${rounds} is ${game.user.currentStamina}.`)

          game.user.currentSpeed = roundResult.playerOne.currentSpeed;
          $("#user-current-speed").html(game.user.currentSpeed > game.user.maxStamina ? game.user.maxStamina : game.user.currentSpeed);
          console.log(`${game.user.name} current speed after round ${rounds} is ${game.user.currentSpeed}.`);

          game.user.defenseSpeed = roundResult.playerOne.defenseSpeed;
          $("#user-defense-speed").html(game.user.defenseSpeed);
          console.log(`${game.user.name} defense speed in round ${rounds} was ${game.user.defenseSpeed}.`)
          

          // update npc data to game object and to the screen

          game.npc.maxStamina = game.npc.stamina - npcWounds;
          $("#npc-max-stamina").html(game.npc.maxStamina);
          console.log(`${game.npc.name} maxStamina is ${game.npc.maxStamina}.`);

          game.npc.currentStamina = roundResult.playerTwo.currentStamina;
          $("#npc-current-stamina").html(game.npc.currentStamina > game.npc.maxStamina ? game.npc.maxStamina : game.npc.currentStamina);
         console.log(`${game.npc.name} currentStamina after round ${rounds} is ${game.npc.currentStamina}.`);

          game.npc.currentSpeed = roundResult.playerTwo.currentSpeed;
          $("#npc-current-speed").html(game.npc.currentSpeed > game.npc.maxStamina ? game.npc.maxStamina : game.npc.currentSpeed);
          console.log(`${game.npc.name} current speed after round ${rounds} is ${game.npc.currentSpeed}.`);

          game.npc.defenseSpeed = roundResult.playerTwo.defenseSpeed;
          $("#npc-defense-speed").html(game.npc.defenseSpeed);
          console.log(`${game.npc.name} defense speed during round ${rounds} was ${game.npc.defenseSpeed}.`);
          
          $("#billboard-container").show();
          $("#billboard").empty();
         
          postResult (roundResult.playerTwo, roundResult.playerOne);
          postResult (roundResult.playerOne, roundResult.playerTwo);

          let roundUpdate = `Results for round ${rounds}:`;
          $("#billboard").prepend("<br>" + roundUpdate + "<br>");
          rounds++;

          $.post(`/api/battles/attacks/phasetwo`, roundResult, gameOver => {
            console.log(`here's the PhaseTwo verdict: `, gameOver)
            if (gameOver) {
              console.log(`The battle continues!`)
            } else {
              console.log(`The battle is over! `)
              var winner = game.user.currentStamina > 0 ? game.user.name : game.npc.name;
            
             console.log(`The winner is ${winner}!`);

             var result = "<p>The battle is over! <br> <br>" + winner +  " has won! </p>";
             $("log-content").append(result);
             $("#combat-log").modal();
           }
          })

          function postResult(one, two) {
            if (one.hit) {
              let result = `${two.name} attacked ${one.name} with a ${two.attacks[0].attack.attackType ? `base attack` : `weak spot attack`} using a ${two.attacks[0].attack.weapon.name} and HIT! The hit resulted in ${one.wounds > 0 ? one.wounds + " damage" : "no wounds to " + one.name}. `;

              $("#billboard").prepend("<br>" + result + "<br>");
            } else {
              let result = `${two.name} attacked ${one.name} with a ${two.attacks[0].attack.attackType ? `base attack` : `weak spot attack`} using a ${two.attacks[0].attack.weapon.name} but MISSED! `;

              $("#billboard").prepend("<br>" + result + "<br>");
            }
          }

        })
        })
      })
  })
});
