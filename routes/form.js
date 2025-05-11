import express from "express";
import formHandler from "../controllers/formHandler.js";

const formRouter = express.Router();

/**
 * @route   POST /api/v1/form
 * @desc    Submit form data and save to file
 * @access  Public
 */
formRouter.post("/form", formHandler);

export default formRouter;
