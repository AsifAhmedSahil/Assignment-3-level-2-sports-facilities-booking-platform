import express from "express";
import { facilitiesController } from "./facilities.controller";

const router = express.Router();

router.post("/", facilitiesController.createFacility);
router.get("/", facilitiesController.getAllFacility);
router.put("/:id", facilitiesController.updateFacility);
router.delete("/:id", facilitiesController.deleteFacility);

export const facilitiesRouter = router;