import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MongoDB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Not connected");
  });
app.listen(3000, () => {
  console.log("Server is running ok");
});
