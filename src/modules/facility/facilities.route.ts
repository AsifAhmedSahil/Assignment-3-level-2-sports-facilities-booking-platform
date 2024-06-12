import express from "express";
import { facilitiesController } from "./facilities.controller";
import validationSchema from "../../middlewares/ValidationSchema";
import { facilitiesValidaions } from "./facilities.validation";

const router = express.Router();

router.post("/",validationSchema(facilitiesValidaions.createFacilitiesValidation), facilitiesController.createFacility);
router.get("/", facilitiesController.getAllFacility);
router.put("/:id", facilitiesController.updateFacility);
router.delete("/:id", facilitiesController.deleteFacility);

export const facilitiesRouter = router;