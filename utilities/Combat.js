import { phaseOne } from "./PhaseOne";
import { phaseTwo } from "./PhaseTwo";
import { phaseThree } from "./PhaseThree";
import { phaseFour } from "./PhaseFour";
import { phaseFive } from "./PhaseFive";
import { phaseSix } from "./PhaseSix";

module.exports = combat = (Arena, playerOne, playerTwo) => {
  var battleResults = {
    playerOne: playerOne,
    playerTwo: playerTwo,
    winner: ""
  };
  phaseOne(Arena, playerOne, playerTwo);

  while (phaseTwo(playerOne, playerTwo)) {
    phaseThree(playerOne, playerTwo);
    phaseFour(playerOne, playerTwo);
    phaseFive(playerOne, playerTwo);
    phaseSix(playerOne, playerTwo);
  }

  battleResults.winner =
    playerOne.currentStamina > 0 ? playerOne.name : playerTwo.name;

  return battleResults;
};
