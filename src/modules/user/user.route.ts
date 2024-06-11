import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router();

router.post("/signup", userControllers.createUser);

export const userRouter = router;