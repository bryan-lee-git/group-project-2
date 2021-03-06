var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  app.get("/accounts/view", function(req, res) {
    console.log("%%%%%%%%% is logged in", req.isAuthenticated());
    if (req.isAuthenticated()) {
      db.Accounts.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        res.render("view-account", user);
      });
    } else {
      var user = {
        id: null,
        isloggedin: req.isAuthenticated()
      };
      res.redirect("/");
    }
  });

  app.put("/accounts/:accountKey", function(req, res) {
    db.Accounts.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        account_key: req.body.accountKey
      },
      {
        where: {
          accountKey: req.params.accountKey
        }
      }
    ).then(function(dbAccounts) {
      res.json(dbAccounts);
    });
  });

  // app.delete("/accounts/:email", function(req, res) {
  //   db.Accounts.destroy({
  //     where: {
  //       email: req.params.email
  //     }
  //   }).then(function(dbAccounts) {
  //     req.session.destroy(function(err) {
  //       if (err) console.log(err);
  //       res.clearCookie("user_sid");
  //       res.clearCookie("firstName");
  //       res.clearCookie("user_id");
  //       res.redirect("/");
  //     });
  //   });
  // });

  app.delete("/accounts/:email", function(req, res) {
    db.Accounts.destroy({
      where: {
        email: req.params.email
      }
    }).then(function(dbAccounts) {
      res.redirect("/landing");
    });
  });

  // logout of user account
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("firstName");
      res.clearCookie("user_id");
      res.redirect("/");
    });
  });

  // process the signup form
  app.post("/signup", function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        console.log("user error", user);
        return res.send({
          success: false,
          message: "authentication failed"
        });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginerr);
          return next(loginErr);
        }
        console.log("redirecting....");
        res.cookie("firstName", user.firstName);
        res.cookie("user_id", user.uuid);
        return res.redirect(200, "/character");
      });
    })(req, res, next);
  });

  app.post("/login", function(req, res, next) {
    passport.authenticate("local-login", function(err, user, info) {
      //console.log("\n\n\n########userrrr", user);
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        return res.send({
          success: false,
          message: "authentication failed"
        });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr);
          return next(loginErr);
        }
        console.log("redirecting....");
        res.cookie("firstName", user.firstName);
        res.cookie("user_id", user.uuid);
        return res.json(true);
      });
    })(req, res, next);
  });
};
