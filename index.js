const express = require("express");
const tourRouter = require("./router/tour_router");
const userRouter = require("./router/user_router");
const app = express();

app.use("/callapi/0.1/tours", tourRouter);
app.use("/callapi/0.1/auth", userRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening at Port ${port}...`));
