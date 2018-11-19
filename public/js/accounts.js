$("#add-account").on("click", function(event) {
  event.preventDefault();
  console.log("Add account button clicked.");
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
      window.location.href = "/character";
    });
  } else {
    console.log("**Please fill out entire form**");
    $("#create-err-msg").empty("").text("**Please fill out entire form**");
  }
});

$("#update-account").on("click", function(event) {
  event.preventDefault();
  var changeAccount = {
    firstName: $("#inputFirst").val(),
    lastName: $("#inputLast").val(),
    email: $("#inputEmail").val(),
    accountKey: $("#inputPassword").val(),
  };
  $("#err-msg").empty("");
  if (changeAccount.accountKey.length > 0 && changeAccount.email.length > 0 && changeAccount.lastName.length > 0 && changeAccount.firstName.length > 0) {
    $.ajax({
      type: "PUT",
      url: `/accounts/${changeAccount.accountKey}`,
      data: changeAccount
    }).then(function() {
      console.log("Updated account", changeAccount);
      location.reload();
    });
  } else {
    console.log("**Please fill out entire form**");
    $("#update-err-msg").empty("").text("**Please fill out entire form**");
  }
});

$("#delete-account").on("click", function(event) {
  event.preventDefault();
  $("#err-msg").empty("");
  $("#delete-account-modal").modal("show");
});

$("#confirm-delete").on("click", () => {
  var deleteAccount = {
    email: $("#emailConfirm").val()
  };
  if (deleteAccount.email.length > 0) {
    $.ajax(`/accounts/${deleteAccount.email}`, {
      type: "DELETE"
    }).then((data) => {
      if (data) window.location.href = "/";
    });
  } else {
    console.log("fill out entire form");
    $("#err-msg").empty("").text("fill out entire form");
  }
});
