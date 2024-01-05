const express = require("express");
const { configDotenv } = require("dotenv");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

const app = express();
configDotenv();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection good"))
  .catch((err) => console.log(err, "error"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
