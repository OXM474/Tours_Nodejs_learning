const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const tourRouter = require("./router/tour_router");
const userRouter = require("./router/user_router");
const middleware = require("./middlewares/logger");

dotenv.config("./.env");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
if (process.env.node_env === "development") {
  app.use(morgan("dev"));
}
app.use(middleware.logger);

app.use("/api/0.1/tours", tourRouter);
app.use("/api/0.1/auth", userRouter);
app.use("/api/0.1/user", userRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening at Port ${port}...`));
