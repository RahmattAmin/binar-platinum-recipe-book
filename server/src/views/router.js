import express from "express";

import recipeRouter from "./recipe.router.js";
import userProfileRouter from "./userProfile.router.js";
import userRouter from "./user.router.js";

const router = express.Router();

router.use(recipeRouter);
router.use(userProfileRouter);
router.use(userRouter);

export default router;