import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
dotenv.config();

//mongodb connectio
mongoose
  .connect(process.env.MongoDB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Not connected");
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || " Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
// api routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter)

app.listen(3000, () => {
  console.log("Server is running ok");
});
