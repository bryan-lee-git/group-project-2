// Code here handles what happens when a user submits a new account.
console.log("Accounts.js loaded");

// ADD
$("#add-account").on("click", function(event) {
  event.preventDefault();
  console.log("Add account button clicked.");
  // make a newAccount obj
  console.log($("#inputFirst").val());
  var newAccount = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    email: $("#inputEmail").val(),
    accountKey: $("#inputPassword").val()
  };

  if (newAccount.accountKey.length > 0 && newAccount.email.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: "post",
      url: "/signup",
      data: newAccount
    }).then(function(data) {
      window.location.href = "/";
    });
  } else {
    console.log("**Please fill out entire form**");
    $("#create-err-msg").empty("").text("**Please fill out entire form**");
  }
});

// UPDATE
$("#update-account").on("click", function(event) {
  event.preventDefault();
  // capture All changes
  var changeAccount = {
    firstName: $("#inputFirst").val(),
    lastName: $("#inputLast").val(),
    email: $("#inputEmail").val(),
    accountKey: $("#inputPassword").val(),
  };
  $("#err-msg").empty("");
  console.log(changeAccount);

  if (changeAccount.accountKey.length > 0 && changeAccount.email.length > 0 && changeAccount.lastName.length > 0 && changeAccount.firstName.length > 0) {
    $.ajax({
      type: "PUT",
      url: `/accounts/${changeAccount.accountKey}`,
      data: changeAccount
    }).then(function() {
      console.log("Updated account", changeAccount);
      // Reload the page to get the updated list
      location.reload();
    });
  } else {
    console.log("**Please fill out entire form**");
    $("#update-err-msg").empty("").text("**Please fill out entire form**");
  }
});

// DELETE   ***************************************************
$("#delete-account").on("click", function(event) {
  event.preventDefault();
  $("#err-msg").empty("");
  $("#delete-account-modal").modal("show");
});

$("#confirm-delete").on("click", function(event) {
  var deleteAccount = {
    email: $("#emailConfirm").val()
  };
  console.log(deleteAccount);
  if (deleteAccount.email.length > 0) {
    $.ajax(`/accounts/${deleteAccount.email}`, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted account");
      // Reload the page to get the updated list
      location.reload();
    });
  } else {
    console.log("fill out entire form");
    $("#err-msg").empty("").text("fill out entire form");
  }
});
