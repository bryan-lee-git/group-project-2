var equippedWeapon = [];
var equippedArmor = [];
var userWallet = $("#lira-display").html();
var characterId = $("#character-id").data("id");

$.ajax({
  method: "GET",
  url: "http://localhost:3000/api/users/equipment/" + characterId
}).then(function(data) {
  if (data[0].Equipment.length > 0) {
    equippedWeapon.push(data[0].Equipment[0]);
    equippedArmor.push(data[0].Equipment[1]);
    validate();
  }
});

$(".equip-weapon").on("click", function() {
  var weapon = {
    id: $(this).data("id"),
    type: $(this).data("type"),
    name: $(this).data("name"),
    statIncrease: $(this).data("statincrease"),
    weight: parseInt($(this).data("weight")),
  }
  if (equippedWeapon.length === 0) {
    equippedWeapon.push(weapon);
    console.log(`${weapon.name} equipped!`);
    validate();
  } else console.log("You already have a weapon equipped.");
});

$(".equip-armor").on("click", function() {
  var armor = {
    type: $(this).data("type"),
    name: $(this).data("name"),
    statIncrease: $(this).data("statincrease"),
    weight: parseInt($(this).data("weight")),
  }
  if (equippedArmor.length === 0) {
    equippedArmor.push(armor);
    console.log(`${armor.name} equipped!`);
    validate();
  } else console.log("You already have armor equipped.");
});

$("#equipped-items").on("click", function() {
  if (equippedArmor.length === 0 && equippedWeapon.length === 0) {
    $("#equipment-tables").hide();
    $("#no-equipment").remove();
    $("#equipped-content").prepend("<h1 id='no-equipment' class='center-align'><br/>NO ITEMS EQUIPPED</h1>");
  } else {
    $("#equipped-weapon-content").empty();
    $("#equipped-armor-content").empty();
    $("#no-equipment").remove();
    $("#equipment-tables").show();
    $("#equipped-weapon-content").append(`
      <tr>
        <td>${equippedWeapon[0].name}</td>
        <td>${equippedWeapon[0].statIncrease}</td>
        <td><button class="btn unequip-weapon"><i class="material-icons">remove_circle</i></button></td>
      </tr>
    `);
    $("#equipped-armor-content").append(`
      <tr>
        <td>${equippedArmor[0].name}</td>
        <td>${equippedArmor[0].statIncrease}</td>
        <td>${equippedArmor[0].weight}</td>
        <td><button class="btn unequip-armor"><i class="material-icons">remove_circle</i></button></td>
      </tr>
    `);
  }
});

$("body").on("click", ".unequip-weapon", function() {
  $.ajax({
    method: "DELETE",
    url: `/api/equipment/${equippedWeapon[0].id}`,
  });
  equippedWeapon = [];
  $("#equipped-weapon-content").empty();
  validate();
  if (equippedArmor.length === 0 && equippedWeapon.length === 0) {
    $("#equipment-tables").hide();
    $("#no-equipment").remove();
    $("#equipped-content").prepend("<h1 id='no-equipment' class='center-align'><br/>NO ITEMS EQUIPPED</h1>");
  }
});

$("body").on("click", ".unequip-armor", function() {
  $.ajax({
    method: "DELETE",
    url: `/api/equipment/${equippedArmor[0].id}`,
  });
  equippedArmor = [];
  $("#equipped-armor-content").empty();
  validate();
  if (equippedArmor.length === 0 && equippedWeapon.length === 0) {
    $("#equipment-tables").hide();
    $("#no-equipment").remove();
    $("#equipped-content").prepend("<h1 id='no-equipment' class='center-align'><br/>NO ITEMS EQUIPPED</h1>");
  }
});

$(".submit-equipment").on("click", function() {
  if (equippedWeapon.length > 0) {
    var weapon = {
      name: equippedWeapon[0].name,
      statIncrease: equippedWeapon[0].statIncrease,
      type: equippedWeapon[0].type,
      weight: equippedWeapon[0].weight,
      characterId: $("#character-id").data("id")
    };
    $.post("/api/equipment", weapon, data => {
      console.log(data);
    });
  }
  if (equippedArmor.length > 0) {
    var armor = {
      name: equippedArmor[0].name,
      statIncrease: equippedArmor[0].statIncrease,
      type: "armor",
      weight: equippedArmor[0].weight,
      characterId: $("#character-id").data("id")
    };
    $.post("/api/equipment", armor, data => {
      console.log(data);
    });
  }
  window.location.href = "/ludus-magnus";
});

$("body").on("click", ".sell-weapon, .sell-armor", function() {
  let soldItem = {
    name: $(this).data("name"),
    id: $(this).data("id")
  };
  let newWallet = parseInt(userWallet) + $(this).data("cost");
  userWallet = newWallet;
  $.ajax({
    method: "PUT",
    url: `/api/users/wallet/${$("#character-id").data("id")}`,
    data: {
      wallet: newWallet
    }
  }).then(function() {
    $.ajax({
      method: "DELETE",
      url: `/api/purchase/${soldItem.id}`,
    });
  });
  $("#lira-display").html(newWallet);
  $(this).closest("tr").remove();
});

function validate() {
  if (equippedWeapon.length > 0) {
    $(".equip-weapon").addClass("disabled");
  }
  if (equippedArmor.length > 0) {
    $(".equip-armor").addClass("disabled");
  }
  if (equippedWeapon.length === 0) {
    $(".equip-weapon").removeClass("disabled");
  }
  if (equippedArmor.length === 0) {
    $(".equip-armor").removeClass("disabled");
  }
};