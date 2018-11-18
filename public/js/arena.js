$("#player-stats").hide();
$("#player-gear").hide();
$("#npc-stats").hide();

$("#player-stats-btn").on("click", () => {
    $("#player-stats").slideToggle(300);
    $("#player-gear").slideUp(300);
})

$("#player-gear-btn").on("click", () => {
    $("#player-stats").slideUp(300);
    $("#player-gear").slideToggle(300);
})

$("#npc-stats-btn").on("click", () => {
    $("#npc-stats").slideToggle(300);
})