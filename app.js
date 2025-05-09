import express from "express";
import dotenv from "dotenv";
import formRouter from "./routes/form.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1", formRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
