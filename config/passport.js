var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

module.exports = function(passport) {
  // passport session setup
  passport.serializeUser(function(user, done) {
    done(null, user.uuid);
  });

  // used to deserialize the user
  passport.deserializeUser(function(uuid, done) {
    db.Accounts.findById(uuid).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // LOCAL SIGNUP
  passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "accountKey",
    passReqToCallback: true
  },
  function(req, email, accountKey, done) {
    process.nextTick(function() {
      db.Accounts.findOne({
        where: {
          email: email
        }
      }).then(function(user, err) {
        if (err) {
          console.log("err", err);
          return done(err);
        }
        if (user) {
          console.log("signupMessage", "That email is already taken.");
          return done(null, false, req.flash("signupMessage", "That email is already taken."));
        } else {
          db.Accounts.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            accountKey: db.Accounts.generateHash(accountKey)
          }).then(function(dbUser) {
            return done(null, dbUser);
          }).catch(function(err) {
            console.log(err);
          });
        }
      });
    });
  }));

  // LOCAL LOGIN
  passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "accountKey",
    passReqToCallback: true
  },
  function(req, email, accountKey, done) {
    db.Accounts.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user, err) {
      if (!user) {
        console.log("no user found");
        return done(null, false, req.flash("loginMessage", "No user found."));
      }
      if (user && !user.validPassword(req.body.accountKey)) {
        return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
      }
      return done(null, user);
    });
  }));
};
