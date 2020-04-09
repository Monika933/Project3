var express = require("express");
var _ = require("lodash");
var db = require("../models");

var router = express.Router();
module.exports = router;

  // Appointments routes ========================================================
  // GET route for getting all of the appointments client schedule user logged in
	router.get("/api/appointments/:id", function(req, res) {
    db.Appointment.findAll({
      where: {
        ClientId: req.params.id
      }
    }).then(function(dbAppointment) {
      res.json(dbAppointment);
      // console.log("For Test" , dbAppointment);
    });
  });

  // GET route for getting all of the appoint appointments associate with user logged in
	router.get("/api/appoint/:id", function(req, res) {
    db.Appointment.findAll({
      where: {
        appointId: req.params.id
      }
    }).then(function(dbAppointment) {
      res.json(dbAppointment);
      // console.log("For Test" , dbAppointment);
    });
  });


  // GET route for getting all of the Appointments
  router.get("/api/appointments", function(req, res) {
    db.Appointment.findAll({})
      .then(function(dbAppointment) {
        res.json(dbAppointment);
      });
  });

	// GET route for returning all available Appointments
  router.get("/api/availableappointments", function(req, res) {
    db.Appointment.findAll({
      where: {
        userAccept: false,
	      requesterAccept: false,
        clientMarkComplete: false
      }
    })
      .then(function(dbAppointments) {
        res.json(dbAppointments);
      });
  });


  // GET route for returning appointments for a specific treatment
  router.get("/api/appointments/treatment/:treatment", function(req, res) {
    db.Appointment.findAll({
      where: {
        treatment: req.params.treatment
      }
    })
      .then(function(dbAppointment) {
        res.json(dbAppointment);
      });
  });


  // GET rotue for retrieving a single appointment
  router.get("/api/appointments1/:id", function(req, res) {
    db.Appointment.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbAppointment) {
        res.json(dbAppointment);
      });
  });



  // POST route for saving a new appointment
  router.post("/api/appointments", function(req, res) {
    db.Appointment.create(req.body)
      .then(function(dbAppointment) {
        res.json(dbAppointment);
      });
  });

  // DELETE route for deleting appointments
  router.delete("/api/appointments/:id", function(req, res) {
    db.Appointment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbAppointment) {
        res.json(dbAppointment);
      });
  });

  // PUT route for updating appointments
  router.put("/api/appointments", function(req, res) {
    db.Appointment.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbAppointment) {
        res.json(dbAppointment);
      });
  });


  // PUT route to update Appoint to Appointment
router.put("/api/updateAppoint", function(req, res) {
    console.log(req.body);
  db.Appointment.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbAppointment) {
      res.json(dbAppointment);
    });
});

//Delete all Foreign Keys
router.delete("/api/appointments/delete/:id", function(req, res) {
  db.Appointment.destroy({
    where: {
      ClientId: req.params.id
    }
  }).then(function(dbAppointment) {
    res.json(dbAppointment);
  });
});


