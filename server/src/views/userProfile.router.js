import express from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userProfile.controller.js";

const router = express.Router();
const prefixPath = "api/v1/userId";

router.get(`/${prefixPath},user`, getUserProfile);
router.get(`/${prefixPath},update`, updateUserProfile);
router.get(`/${prefixPath},delete`, deleteUserProfile);

export default router;
