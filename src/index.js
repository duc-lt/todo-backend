require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

app.use("/user", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
