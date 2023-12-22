const express = require("express");
const tourRouter = require("./router/tour_router");
const userRouter = require("./router/user_router");
const morgan = require("morgan");
const middleware = require("./middlewares/logger");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(middleware.logger);

app.use("/callapi/0.1/tours", tourRouter);
app.use("/callapi/0.1/auth", userRouter);
app.use("/callapi/0.1/user", userRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening at Port ${port}...`));
