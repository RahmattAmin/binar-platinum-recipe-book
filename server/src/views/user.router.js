import express from "express";
import { authController } from "../controllers/recipe.controllers.js";

const router = express.Router();
const prefixPath = "api/v1/auth";

router.post(`/${prefixPath}/ping`, (req, res) => {
  res.status(200).json({ ping: "OK" });
});
router.post(`/${prefixPath}/login`, authController.isLogin);
router.post(`/${prefixPath}/register`, authController.registerUsers);
router.get(`/${prefixPath}/users`, authController.getUsers);
router.put(`/${prefixPath}/:id`, authController.updatePassword);
router.delete(`/${prefixPath}/:id`, authController.deleteUserAndProfile);

export default router;
