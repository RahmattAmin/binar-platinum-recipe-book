import express from "express";

import recipeRouter from "./recipe.router.js";
import authRouter from "./user.router.js";
// import userRouter from "./user.router";

const router = express.Router();

router.use(recipeRouter);
router.use(authRouter);
// router.use(userRouter);

export default router;
