// creates variables from the info injected into handlebars from the DB
var userWallet = $("#lira-display").html();
var userSpeed = $("#market-speed-slide").attr("value");
var userStrength = $("#market-strength-slide").attr("value");
var userStamina = $("#market-stamina-slide").attr("value");

// listens for a change on the speed slide
$("#market-speed-slide").change(function() {
  // creates variables for the new location and the difference in locations of the slide
  let newUserSpeed = $("#market-speed-slide").val();
  let speedDiff = userSpeed - newUserSpeed;
  // gets the cost of the users new location on the slide by running upCost function and assigning it a variable
  // the first argument for speed should be 200. it will be 100 for strength and stamina
  // is 100 here for demo purposes: NEEDS TO BE CHANGED FOR FINAL VERSION
  let costMath = upCost(100, userWallet, userSpeed, newUserSpeed);
  // runs the walletCheck to see if the user has the lira for buying the desired training
  let accountCheck = walletCheck(userWallet, costMath.results)
  // if the user slides the slide positively
  if (speedDiff < 0) {
    // if the user has enough lira
    if (accountCheck) {
      // sets the userSpeed to newUserSpeed
      userSpeed = newUserSpeed;
      // sets the userWallet to the costMath.wallet 
      userWallet = costMath.wallet;
      // displays the users wallet at on the lira display span
      $("#lira-display").html(userWallet);
      // if the user doesnt have enough lira forces the slide back to the origin location
    } else if (!accountCheck) {
        $("#market-speed-slide").val(userSpeed);
    }
    // if the user moves the slide negatively
  } else if (speedDiff > 0) {
      // runs the downCost function and assigns it to the moneyBack variable
      let moneyBack = downCost(100, userWallet, userSpeed, newUserSpeed);
      // sets the users wallet to the moneyBack variable
      userWallet = moneyBack;
      // sets the users speed slide location to the new location
      userSpeed = newUserSpeed;
      // displays the users lira in the lira-display span
      $("#lira-display").html(userWallet);
    } 
});

// strength slide functions the same as speed slide
$("#market-strength-slide").change(function() {
  let newUserStrength = $("#market-strength-slide").val();
  let costMath = upCost(100, userWallet, userStrength, newUserStrength);
  let strengthDiff = userStrength - newUserStrength;
  let accountCheck = walletCheck(userWallet, costMath.results)
  if (strengthDiff < 0) {
    if (accountCheck.boolean) {
      userStrength = newUserStrength;
      userWallet = costMath.wallet;
      $("#lira-display").html(userWallet);
    } else if (!accountCheck) {
        $("#market-strength-slide").val(userStrength);
    }
  } else if (strengthDiff > 0) {
      console.log("moved back");
      let moneyBack = downCost(100, userWallet, userStrength, newUserStrength);
      console.log(moneyBack);
      userWallet = moneyBack;
      userStrength = newUserStrength;
      $("#lira-display").html(userWallet);
    } 
});

// stamina slide functions the same as the speed slide
$("#market-stamina-slide").change(function() {
  let newUserStamina = $("#market-stamina-slide").val();
  let costMath = upCost(100, userWallet, userStamina, newUserStamina);
  let staminaDiff = userStamina - newUserStamina;
  let accountCheck = walletCheck(userWallet, costMath.results)
  if (staminaDiff < 0) {
    if (accountCheck.boolean) {
      userStamina = newUserStamina;
      userWallet = costMath.wallet;
      $("#lira-display").html(userWallet);
    } else if (!accountCheck) {
        $("#market-stamina-slide").val(userStamina);
    }
  } else if (staminaDiff > 0) {
      console.log("moved back");
      let moneyBack = downCost(100, userWallet, userStamina, newUserStamina);
      console.log(moneyBack);
      userWallet = moneyBack;
      userStamina = newUserStamina;
      $("#lira-display").html(userWallet);
    } 
});

// runs the math to get the current slides cost
function baseCalculator (base, oldSlideLocation){
  // runs a for loop from 1 to the number the slide is on
  for (let x = 1; x < oldSlideLocation; x++) {
    // adds the base number plus twenty percent to the previous number
    base += parseInt(base * .20);
  }
  // returns the final number after the for loop
  return base;
}

// runs the math that deals with the slide going down
function downCost(base, wallet, oldSlideLocation, newSlideLocation) {
  // assigns newWallet to wallet
  let newWallet = wallet;
  // runs a for loop that decrements from the old slide to the new slide locations
  for (let y = oldSlideLocation; y > newSlideLocation; y--) {
    // does the math for each iteration by running the baseCalcualtor funtion and assigning it to the newBase variable
    let newBase = baseCalculator(base, y);
    // adds the retuned number to the newWallet variable
    newWallet = newWallet + newBase;
  }
  // returns the newWallet after all the incrimentation math has been performed
  return newWallet;
}

// runs the math that deals with the slide going up
function upCost(base, wallet, oldSlideLocation, newSlideLocation) {
  // assigns variables for the wallet, the base cost of the slides origin location, and currentResults
  let newWallet = wallet;
  let newBase = baseCalculator(base, oldSlideLocation);
  let currentResults = newBase;
  // runs a for loop that increaments up between the slides origin location and new location 
  for (let y = oldSlideLocation; y < newSlideLocation; y++){
    // adds currentResults value to the currentResluts + 20% value 
    currentResults += parseInt(currentResults * .20)
    // subtracts the new currentResults value from the newWallet value
    newWallet = newWallet - currentResults;
  }
  // returns and object that contains the currentResults value and the newWallet value
  return resultsWallet = {
    results: currentResults,
    wallet: newWallet
  };
}


// checks to see if the user has enough money and then returns either true or false
function walletCheck(wallet, costMath) {
  let trainCost = costMath

  if (wallet > trainCost) {
    return  true;
  } else {
    return false;
  }
};




