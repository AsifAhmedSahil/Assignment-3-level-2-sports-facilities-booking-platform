import express from "express";
import { authControllers } from "./auth.controller";



const router = express.Router();

router.post("/signup", authControllers.signupController);
router.post("/adminSignup", authControllers.adminSignUpController);
router.post("/login", authControllers.loginController);
router.get("/:id", authControllers.loginController);

export const authRouter = router;
