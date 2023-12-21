const express = require("express");
const userscontroller = require("../controller/user_controller");
const userRouter = express.Router();

userRouter
  .route("/")
  .get(userscontroller.getAllUsers)
  .post(userscontroller.getOneUser);
userRouter.route("/login").get(userscontroller.login);
userRouter.route("/register").post(userscontroller.register);
userRouter
  .route("/:id")
  .get(userscontroller.getOneUser)
  .post(userscontroller.editUser)
  .delete(userscontroller.deleteUser);

module.exports = userRouter;
