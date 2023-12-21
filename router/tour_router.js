const express = require("express");
const tourscontroller = require("../controller/tour_controller");
const tourRouter = express.Router();

tourRouter
  .route("/")
  .get(tourscontroller.getAllTours)
  .post(tourscontroller.addNewTour);
tourRouter
  .route("/:id")
  .get(tourscontroller.getOneTours)
  .post(tourscontroller.editTour)
  .delete(tourscontroller.deleteTour);

module.exports = tourRouter;
