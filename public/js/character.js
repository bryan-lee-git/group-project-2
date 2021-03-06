var globalStatPoints = 10;
var speedLocation = 3;
var strengthLocation = 12;
var staminaLocation = 12;
var skillLocation = 1;
var avatarSelect = false;

// displays stat point alotment
$("#skill-points-display").html(globalStatPoints);

// changing the speed slider
$("#create-speed-slide").change(function() {
  // graps the new slider value and assigns it a variable
  // finds the difference between the old value and the new value and assigns it a variable
  var newSpeedLocation = $("#create-speed-slide").val();
  var speedDiff = speedLocation - newSpeedLocation;
  // creates a if statement that checks to see if the user has skill points to spend or if...
  // ...they are returning points by sliding the slider backwards
  if (globalStatPoints > 0 || speedDiff > 0) {
    // finds the difference between the users points left and how much the slide was moved...
    // ...assigns that a variable
    var checker = globalStatPoints + speedDiff;
    // another if statement that checks to see if the user has enough points to complete their action
    if (checker >= 0) {
      // if they have pionts it updates the global skill points to the difference between the old skill points...
      // ... value and how much they moved the slide. updates the location of the slide on the slider...
      // ... displays the new remaining skill points
      globalStatPoints = checker;
      speedLocation = newSpeedLocation;
      $("#skill-points-display").html(globalStatPoints);
    } else if (checker < 0) {
      // should the user try to get more points than they have it sets the location of the slide to ...
      // ... the maximum number without going negative. sets globalstats to 0. forces the slide to ...
      // ... match the numerical value of its max without going negative. displays the updated global ...
      // ... stat points
      speedLocation = parseInt(newSpeedLocation) + parseInt(checker);
      globalStatPoints = 0;
      $("#create-speed-slide").val(speedLocation);
      $("#skill-points-display").html(globalStatPoints);
    }
  } else {
    // should the user try to move the slide negative with 0 points returns it to its last value
    $("#create-speed-slide").val(speedLocation);
  }
  // runs a validation check
  validation();
});

// strength slider functions the same as speed slider
$("#create-strength-slide").change(function() {
  var newStrengthLocation = $("#create-strength-slide").val();
  var strengthDiff = strengthLocation - newStrengthLocation;
  if (globalStatPoints > 0 || strengthDiff > 0) {
    var checker = globalStatPoints + strengthDiff;
    if (checker >= 0) {
      globalStatPoints = checker;
      strengthLocation = newStrengthLocation;
      $("#skill-points-display").html(globalStatPoints);
    } else if (checker < 0) {
      strengthLocation = parseInt(newStrengthLocation) + parseInt(checker);
      globalStatPoints = 0;
      $("#create-strength-slide").val(strengthLocation);
      $("#skill-points-display").html(globalStatPoints);
    }
  } else {
    $("#create-strength-slide").val(strengthLocation);
  }
  validation();
});

// stamina slider funtions the same as the other sliders
$("#create-stamina-slide").change(function() {
  var newStaminaLocation = $("#create-stamina-slide").val();
  var staminaDiff = staminaLocation - newStaminaLocation;
  if (globalStatPoints > 0 || staminaDiff > 0) {
    var checker = globalStatPoints + staminaDiff;
    if (checker >= 0) {
      globalStatPoints = checker;
      staminaLocation = newStaminaLocation;
      $("#skill-points-display").html(globalStatPoints);
    } else if (checker < 0) {
      staminaLocation = parseInt(newStaminaLocation) + parseInt(checker);
      globalStatPoints = 0;
      $("#create-stamina-slide").val(staminaLocation);
      $("#skill-points-display").html(globalStatPoints);
    }
  } else {
    $("#create-stamina-slide").val(staminaLocation);
  }
  validation();
});

// skill slider functions the same as the other sliders
$("#create-skill-slide").change(function() {
  var newSkillLocation = $("#create-skill-slide").val();
  var skillDiff = skillLocation - newSkillLocation;
  if (globalStatPoints > 0 || skillDiff > 0) {
    var checker = globalStatPoints + skillDiff;
    if (checker >= 0) {
      globalStatPoints = checker;
      skillLocation = newSkillLocation;
      $("#skill-points-display").html(globalStatPoints);
    } else if (checker < 0) {
      skillLocation = parseInt(newSkillLocation) + parseInt(checker);
      globalStatPoints = 0;
      $("#create-skill-slide").val(skillLocation);
      $("#skill-points-display").html(globalStatPoints);
    }
  } else {
    $("#create-skill-slide").val(skillLocation);
  }
  validation();
});

// how the user gets the avatar they want, pushes that image down to the selected-avatar-img
$(".swiper-slide").on("click", function(event) {
  event.preventDefault();
  var slideSource = $(this)
    .children("img")
    .attr("src");
  $("#selected-avatar-img").attr("src", slideSource);
  // sets the avatarSelect to true and runs validaton
  avatarSelect = true;
  validation();
});

// listens for a click on the create character button but the button is disabled until the...
// ... validation conditions are met
$("#create-button").on("click", function(event) {
  event.preventDefault();
  // creates a new character object and grabs its info from the form the user filled out
  var newCharacter = {
    name: $("#user-name").data("name"),
    image: $("#selected-avatar-img").attr("src"),
    male: $("input[name='gender']:checked").val(),
    wallet: 500,
    ArenaId: 1,
    strength: $("#create-strength-slide").val(),
    speed: $("#create-speed-slide").val(),
    stamina: $("#create-stamina-slide").val(),
    skill: $("#create-skill-slide").val(),
    accountuuid: $("#uuid").data("uuid")
  };
  // ajax POST requests passes the newCharacter object as data
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: newCharacter
  }).then(response => {
    console.log(response);
    window.location.href = "/ludus-magnus";
  });
});

// runs a validaton check to make sure the entire form has been filled out before the user can submit
function validation() {
  if (globalStatPoints === 0 && avatarSelect) {
    $("#create-button").removeClass("disabled");
  }
}
