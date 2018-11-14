require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var passport = require("passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session"); // cookie session
var db = require("./models");

require("./config/passport.js")(passport); // pass passport for configuration

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    key: "user_sid",
    secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000 }
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);
require("./routes/accountRoutes")(app, passport);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
