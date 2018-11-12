export default function phaseOne(Arena, playerOne, PlayerTwo) {
  // This function takes objects as parameters. These objects will have been constructed using data from the appropriate tables of the database. We need the route to the Combat page to come from whatever page on which the player preps for battle. On the prep page, the player chooses armor and weapons and assigns them to primary and secondary. We can then pass the constructed player to the combat page in the req.body. When arriving at the combat page, we pull the two players out by assigning them to variable and then pass those variables into the Combat function,
  //
  //  The player object properties are a bit different from the table columns in the database.
  //
  // Arena = {
  //      name:
  //      image:
  //      purse:
  // }
  //
  //   player = {
  //      ** Properties **
  //      name: from db
  //      strength: strength from db
  //      speed: speed from db
  //      stamina: stamina from db
  //      currentSpeed: is set by the setSpeed method. default = speed stat
  //      currentStamina: is set by the setStamina method. default = stamina stat
  //      maxStamina: stamina stat less total of wounds
  //      recovery:  Math.floor((staminaStat - 10) / 2) + 1 invoked by the setStamina method during PhaseSix
  //      attacks: [ an array of attacks. Could be null if no attacks chosen. Otherwise, for each attack, push one object with the properties below:
  //          {
  //          attackSpeed: this is the amount of speed devoted to Attack during a round
  //          attackType: if true, then use the Attack Weak Point rules; otherwise, Base rules
  //          weapon: the weapon from inventory to use in the attack
  //          {
  //  ],
  //      defenseSpeed: 0, **speed devoted to defense; assigned during Phase Four**
  //      fatigue: 0, **total of fatigue; incremented/decremented during PhaseSix**
  //      wounds: 0, **total of wounds; incremented/decremented during phaseFive**
  //      primaryWeapon: chosen on the battle prep page
  //      secondaryWeapon: chosen on the battle prep page
  //      armor: { **chosen on the battle prep page and data from db
  //        shield: true or false whether equiped with a shield; grants +2 bonus to defense if true
  //        type: the name of the armor worn
  //         strength: the strength of the armor worn
  //         weight: invoked by the setSpeed method to help determine speed
  //      }
  //
  //      ** Methods **
  //      setSpeed {
  //        this.currentSpeed = this.speed - **some number based on armor weight and maybe also weapon weight.**
  //        Return either this.currentSpeed or else this.currentStanima whichever is lower.
  //      },
  //      setStamina {
  //        this.currentStamina = this.currentStamina - this.fatigue - this.wounds + this.recovery;
  //        this.maxStamina = this.stamina - this.wounds
  //        return this.currentStamina > this.maxStamina ? this.maxStamina : this.currentStamina
  //
  //      },
  //      doDamage (array) {
  //        takes this.attacks array then calculates and returns the damage. The rules for doing damage by type are to be found in PhaseFour.
  //      },
  //      takeDamage {
  //        **maybe we don't need this one??**
  //      }
  //
  //
  // }
  // This function sets up the DOM in preparation for combat.
  // Using jQuery to hook into the DOM, do this:
  // 1. Put Arena image where it belongs and the Arena name where it goes.
  // 2. Put the playerOne image, name, weapons, and armor where they go.
  // 3. Put the playerTwo image, name, weapons, and armor where they go.
  // 4. Call setStamina for each player and place return value in the appropriate place.
  // 5. Call setSpeed for each player and place value in the appropriate place.
  // 6. Once everything is set up, display button for human players to agree to start combat rounds. Acceptance allows the Combat function to continue.
}
