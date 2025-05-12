import express from "express";
import formHandler from "../controllers/formHandler.js";

const formRouter = express.Router();

formRouter.post("/form", formHandler);

export default formRouter;
