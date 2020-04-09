// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var db = require("../models");

var router = express.Router();
module.exports = router;

//Routes =================================================================================================

// Find all Clients and return them to the user with res.json
router.get("/api/clients", function(req, res) {
  db.Client.findAll({}).then(function(dbClient) {
    res.json(dbClient);
  });
});


router.get("/api/clients/:username", function(req, res) {
  // Find one Client with the id in req.params.id and return them to the user with res.json
  console.log("*************API ROUTES*************");  
  console.log(req.params);
  console.log(req.body);  
  console.log("**************************");
  db.Client.findOne({
    where: {
      username: req.params.username
    }
  }).then(function(dbClient) {
    res.json(dbClient);
  });
});


router.get("/api/clients1/:id", function(req, res) {
  // Find one Client with the id in req.params.id and return them to the user with res.json
  console.log("*************API ROUTES*************");
  console.log(req.params);
  console.log(req.body);
  console.log("**************************");
  db.Client.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbClient) {
    res.json(dbClient);
  });
});




//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   

router.get("api/client/appointment/:id", function(req, res){
    if (req.params.id){
      db.Client.findAll({
        where: {
          id: req.params.id
            },
        include: [db.Appointment]
    }).then(function(dbClient) {
      res.json(dbClient);
    });
  }
})


//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   



router.post("/api/clients", function(req, res) {
  // Create an Client with the data available to us in req.body
  console.log("API LINE 59 " +req.body);
  db.Client.create(req.body).then(function(dbClient) {
    res.json(dbClient);
  });
});



// PUT route for updating password
router.put("/api/update/password", function(req, res) {
  db.Client.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbAppointment) {
      res.json(dbAppointment);
    });
});

// PUT route for logging out and update loggedIn to False
router.put("/api/logout", function(req, res) {
      console.log("*************API ROUTES*************");
      console.log(req.body);
      console.log("*************API ROUTES*************");
  db.Client.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbAppointment) {
      res.json(dbAppointment);
    });
});


// PUT route for logging in and update loggedIn to True
router.put("/api/login", function(req, res) {
    console.log("*************API ROUTES*************");
    console.log(req.body);
    console.log("*************API ROUTES*************");

  db.Client.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbAppointment) {
      res.json(dbAppointment);
    });
});


// PUT route for updating user acct settings
router.put("/api/updateAcct", function(req, res) {
    console.log("*************API ROUTES*************");
    console.log(req.body);
    console.log("*************API ROUTES*************");

  db.Client.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbAppointment) {
      res.json(dbAppointment);
    });
});


router.delete("/api/clients/:id", function(req, res) {
  // Delete the Client with the id available to us in req.params.id
  db.Client.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbClient) {
    res.json(dbClient);
  });
});
