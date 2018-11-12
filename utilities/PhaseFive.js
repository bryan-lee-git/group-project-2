export default function phaseFive(playerOne, playerTwo) {
  //
  //  Resolve Attacks
  //
  //  foreach player, the player with the greatest currentSpeed is selected to attack first.
  //
  //  foreach attack in attackingPlayer.attacks ...
  //  Need a BIG BUTTON that says something like "ATTACK!". onClick of that button, fire off a Math.random that outputs a number from 1 - 20.
  //  Calculate toHitResult = roll + player skill.
  //  If (toHitResult > toHitTarget) { var damage = oppositePlayer.takeDamage(attackingPlayer.doDamage(attack)) }
  //
  // var netDamage = damage - oppositePlayer.armor.strength *** this may be zero if the Attack Weak Point attack type ignores armor ****
  //    var wound = netDamage - oppositePlayer.strengthStat
  //    if (wound > 0) { add wound to oppositePlayer.wounds}
  //    if (wound > 0) { skip the oppositePlayers next turn...if that turn is in this phase, skip it. If it is in the next round, then we need to set the wounded player's currentSpeed to zero. That way, that player cannot act in the next round.}
  // After both players have resolved all attacks, move on to PhaseSix.
}
