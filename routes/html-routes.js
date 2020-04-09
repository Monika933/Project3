// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var path = require("path");

var router = express.Router();
module.exports = router;


// Routes =============================================================

  // index route for home page
  router.get("/", function(req, res) {
    res.render("../views/homepage.jade");
  });

  // route for signup page
  router.get("/signup", function(req, res) {
    res.render("../views/signup.jade");
  });

  // route for forgot password
  router.get("/forgotpassword", function(req, res) {
    res.render("../views/forgotpassword.jade");
  });

    // route for forgot password
  router.get("/about", function(req, res) {
    res.render("../views/about.jade");
  });

  // route for Appointment creation
  router.get("/create", function(req, res) {
    res.render("../views/scheduleAppointment.jade");
  });


  // route for users homepage
  router.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/usersHomePage.html"));
  });

    // route for users homepage
  router.get("/settings", function(req, res) {
    res.render("../views/accountSettings.jade");
  });



