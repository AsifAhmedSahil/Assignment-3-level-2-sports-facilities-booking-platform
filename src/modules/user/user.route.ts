import express from "express";
import { userControllers } from "./user.controller";
import validationSchema from "../../middlewares/ValidationSchema";
import { userValidations } from "./user.validation";
const router = express.Router();

router.post("/signup",validationSchema(userValidations.createUserValidation), userControllers.createUser);
router.get("/", userControllers.getAllUser);
router.get("/:email", userControllers.getUserByEmail);
router.put("/:email", userControllers.updateUser);

export const userRouter = router;
