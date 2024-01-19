const express = require("express");
const tourscontroller = require("../controller/tour_controller");
const tourRouter = express.Router();

tourRouter
  .route("/top-5-cheap")
  .get(tourscontroller.aliasTopTour, tourscontroller.getAllTours);
tourRouter
  .route("/")
  .get(tourscontroller.getAllTours)
  .post(tourscontroller.checkbody, tourscontroller.addNewTour);
tourRouter
  .route("/:id")
  .get(tourscontroller.getOneTour)
  .post(tourscontroller.editTour)
  .delete(tourscontroller.deleteTour);

tourRouter.param("id", tourscontroller.checkID);

module.exports = tourRouter;
