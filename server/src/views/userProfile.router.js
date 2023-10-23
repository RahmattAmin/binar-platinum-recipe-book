import express from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userProfile.controller.js";
import middleware from "../middlewares/api-key.middleware.js";

const router = express.Router();
const prefixPath = "api/v1/userId";

router.get(`/ping`, (_req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.get(`/${prefixPath}/user`, middleware, getUserProfile);
router.get(`/${prefixPath}/update`, middleware, updateUserProfile);
router.get(`/${prefixPath}/delete`, middleware, deleteUserProfile);

export default router;
