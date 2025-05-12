import express from "express";
import dotenv from "dotenv";
import formRouter from "./routes/form.js";

// Helps to access environment variables
dotenv.config();

const app = express();
app.use(express.json());

// route middleware
app.use("/api/v1", formRouter);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
