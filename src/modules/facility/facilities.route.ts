import express from "express";
import { facilitiesController } from "./facilities.controller";

const router = express.Router();

router.post("/", facilitiesController.createFacility);

export const facilitiesRouter = router;