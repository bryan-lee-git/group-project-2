module.exports = function phaseFour(playerOne, playerTwo) {
  // Need a dropdown or other input on the page for both Attack and Defense. The initial number of items = this.setSpeed().
  // Players can see their own speed displayed either just on the input or ideally also in a div or span whose content changes based on making selections.
  //
  //  A submit style button needs to be available so that players can submit their selections when finished.
  //
  // Players allocate their currentSpeed between Attack and Defense.
  //  THEN onSubmit...
  // the player's selection need to be checked against a number of constraints. They are...
  // (1) Players can choose to commit zero (0) points to either Attack and Defense or zero to both.
  //  (2) The sum of points committed to Attack and Defense cannot exceed the player's currentSpeed. This can be facilitated if we use two dropdown menus whose content depends on the other and whose total is always equal to the player's currentSpeed.
  //  (3) If any points are devoted to Attack, they player MUST decide what type of attack use.
  //  Option 1: Base attack - toHitTarget = 10 + opposite player's defense + shield value (if any); //  toHitBonus = player skill stat; damageOnHit = committedStrength + weaponDamage (committedStrength = Math.round((player_strength_stat / 5) * attackSpeed))
  //  Option 2: Attack Weak Point - toHitTarget = 15 + opposite player's defense + shield value (if any); toHitBonus = player skill stat; damageOnHit = (committedStrength + weaponDamage) * 2
  //
  //  ****** I genuinely cannot remember whether we decided Attack Weak Point ignored the target's armor when doing damage. This matters when calculating netDamage in PhaseFive.******
  //
  //  (4) If the speed points committed to Attack > 5, then player gets additional attacks.
  //      Number of attacks = Math.ceiling(attackSpeed / 5).
  //    Players with multiple attacks need to decise not only how much speed to devote to each attack but also what type of attack to make as outlined in (3), above. This is why the player.attacks property is an array of objects.
  //  (5) The player must decide which weapon to use for each attack.
  //      If the weapon is classified as Heavy, then the minimum attackSpeed with that weapon must be 3.
  //      If the weapon is classified as Light, then the maximum attackSpeed is 4.
  //      All other weapons can take any attackSpeed.
  //  (6) If all constraints are satisfied, a modal should pop up for human players to offer a last chance to change their settings. This modal should have BACK and PROCEED buttons which either take them back to the allocation screen or forward into the next Phase.
  //  (7) If any constraint is NOT satisfied, a modal should pop up indicating what went wrong with a BACK button to the selection screen. If we've design our UI correctly, this situation should not ever come up. We should prepare for it anyway.
  //
}
