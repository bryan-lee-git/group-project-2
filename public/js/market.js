// creates variables from the info injected into handlebars from the DB
var userWallet = $("#lira-display").html();
var characterId = $("#character-id").data("id");
var speedCost = parseInt($("#current-speed").html()) * 50;
var strengthCost = parseInt($("#current-strength").html()) * 50;
var staminaCost = parseInt($("#current-stamina").html()) * 50;

$("#speed-cost").append(speedCost);
$("#strength-cost").append(strengthCost);
$("#stamina-cost").append(staminaCost);

$(".stat-btn").on("click", function() {
  var type = $(this).data("type");
  var cost = parseInt($(this).data("id")) * 100;
  var newStat = parseInt($(this).data("id")) + 1;
  var newWallet = parseInt(userWallet) - cost;
  if (newWallet >= 0) {
    $(this).addClass("disabled");
    $(this).html("PURCHASED!");
    $.ajax({
      method: "PUT",
      url: `/api/users/wallet/${characterId}`,
      data: {wallet: newWallet}
    });
    $.ajax({
      method: "PUT",
      url: `/api/users/stats/${characterId}/${type}`,
      data: {
        type: type,
        newStat: newStat
      }
    }).then(() => {
      $("#lira-display").html(newWallet);
      $(`#current-${type}`).html(newStat);
    });
  } else {
    $(this).html("TOO POOR!");
  }
});

$("body").on("click", ".purchase-weapon, .purchase-armor", function() {
  let purchase = {
    name: $(this).data("name"),
    statIncrease: $(this).data("statincrease"),
    cost: $(this).data("cost"),
    type: $(this).data("type"),
    weight: parseInt($(this).data("weight")),
    characterId: characterId
  };
  let newWallet = parseInt(userWallet) - $(this).data("cost");
  if (newWallet >= 0) {
    $(this).addClass("disabled");
    $(this).html("PURCHASED!");
    $.post("/api/purchase", purchase, () => {
      userWallet = newWallet;
      $.ajax({
        method: "PUT",
        url: `/api/users/wallet/${characterId}`,
        data: {wallet: newWallet}
      }).then(() => {
        $("#lira-display").html(newWallet);
      });
    });
  } else {
    $(this).html("TOO POOR!");
  };
}); 
