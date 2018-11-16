// model items
// location: string
// player 1: string - player stats and gear
// player 2: string - player stats and gear
// outcome: string - who won and what the stats were at the end of the game (would be cool to keep some sort of high score board that shows who historically won each battle with the best strategy)

module.exports = function(sequelize, DataTypes) {
  var Battle = sequelize.define("Battle", {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    playerOne: {
      type: DataTypes.INTEGER
    },
    playerTwo: {
      type: DataTypes.INTEGER
    },

    victor: {
      type: DataTypes.INTEGER
    }
  });
  return Battle;
};
