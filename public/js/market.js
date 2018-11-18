var userWallet = $("#lira-display").html();
var userSpeed = $("#market-speed-slide").attr("value");
var userStrength = $("#market-strength-slide").attr("value");
var userStamina = $("#market-stamina-slide").attr("value");

$("#market-speed-slide").change(function() {
  // graps the new slider value and assigns it a variable
  // finds the difference between the old value and the new value and assigns it a variable
  var newSpeedLocation = $("#create-speed-slide").val();
  var speedDiff = userSpeed - newSpeedLocation;
  // creates a if statement that checks to see if the user has skill points to spend or if...
  // ...they are returning points by sliding the slider backwards
  if (userWallet > 0 || speedDiff > 0) {
    // finds the difference between the users points left and how much the slide was moved...
    // ...assigns that a variable
    let checker = globalStatPoints + speedDiff;
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
$("#market-strength-slide").change(function() {
  console.log("i was moved");
  var newUserStrength = $("#market-strength-slide").val();
  var strengthDiff = userStrength - newUserStrength;
  if (strengthDiff < 0) {
    let accountCheck = walletCheckTwenty(userWallet, newUserStrength, strengthDiff)
    if (accountCheck.boolean) {
      userStrength = newUserStrength;
      userWallet = userWallet - accountCheck.cost;
      $("#lira-display").html(userWallet);
    } else if (!accountCheck) {
      $("#market-strength-slide").val(userStrength)
    }
  } else if (strengthDiff > 0) {
    userWallet = parseInt(userWallet) + parseInt(userStrength * 20);
    userStrength = newUserStrength;
    $("#lira-display").html(userWallet);
  }
});

function walletCheckTwenty(wallet, newslide, difference) {
  let trainCost = parseInt(newslide) * 20;

  if (wallet > trainCost) {
    return walletCheckTrue = {
      boolean: true,
      cost: trainCost
    }
  } else {
    return false;
  }
};

function walletCheckTen(wallet, newslide) {
  let trainCost = parseInt(newslide) * 240;
  if (wallet > trainCost) {
    return trainCost; 
  } else {
    return false;
  }
};

// stamina slider funtions the same as the other sliders
$("#market-stamina-slide").change(function() {
  var newStaminaLocation = $("#create-stamina-slide").val();
  var staminaDiff = userStamina - newStaminaLocation;
  if (globalStatPoints > 0 || staminaDiff > 0) {
    let checker = globalStatPoints + staminaDiff;
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

$("body").on("click", ".purchase-weapon, .purchase-armor", function() {
  let purchase = {
    name: $(this).data("name"),
    statIncrease: $(this).data("statincrease"),
    cost: $(this).data("cost"),
    type: $(this).data("type"),
    weight: parseInt($(this).data("weight")),
    characterId: $("#character-id").data("id")
  }
  $.post("/api/purchase", purchase, data => {
    console.log(data);
  })
}); 
