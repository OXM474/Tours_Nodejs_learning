const express = require("express");
const userscontroller = require("../controller/user_controller");
const tourRouter = express.Router();

tourRouter
  .route("/")
  .get(userscontroller.getAllusers)
  .post(userscontroller.addNewTour);
tourRouter
  .route("/:id")
  .get(userscontroller.getOneusers)
  .post(userscontroller.editTour)
  .delete(userscontroller.deleteTour);

module.exports = tourRouter;
