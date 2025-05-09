import express from "express";
import formHandler from "../controllers/formHandler.js";

const formRouter = express.Router();

// endpoint for the form
formRouter.post("/form", formHandler);

export default formRouter;
