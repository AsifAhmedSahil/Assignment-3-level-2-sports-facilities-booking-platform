import express from "express";
import { facilitiesController } from "./facilities.controller";
import validationSchema from "../../middlewares/ValidationSchema";
import { facilitiesValidaions } from "./facilities.validation";
import { auth } from "../../middlewares/auth";
import { USER_Role } from "../user/user.contant";

const router = express.Router();

router.post("/",auth(USER_Role.admin),validationSchema(facilitiesValidaions.createFacilitiesValidation), facilitiesController.createFacility);
router.get("/", facilitiesController.getAllFacility);
router.put("/:id",auth(USER_Role.admin), facilitiesController.updateFacility);
router.delete("/:id",auth(USER_Role.admin), facilitiesController.deleteFacility);

export const facilitiesRouter = router;