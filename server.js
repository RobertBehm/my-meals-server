require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
const userRouter = require("./routes/userRoutes");
const customerRouter = require("./routes/customerRoutes");
const mealRouter = require("./routes/mealRoutes");
const orderRouter = require("./routes/orderRoutes");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again in an hour.",
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(fileUpload());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/orders", orderRouter);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://RobertBehm:Branchave@cluster0.wekxx.mongodb.net/smd-meals"
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
