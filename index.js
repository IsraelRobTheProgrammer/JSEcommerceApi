const { log } = require("console");
const { configDotenv } = require("dotenv");
const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const app = express();

configDotenv();
app.use(morgan("dev"));
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => log("DB connection good"))
  .catch((err) => log(err, "error"));

app.use("/api/users", userRouter);

app.listen(process.env.PORT || 5000, () => {
  log("Backend server is running");
});
