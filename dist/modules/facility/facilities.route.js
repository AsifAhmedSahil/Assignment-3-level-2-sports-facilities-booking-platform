"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitiesRouter = void 0;
const express_1 = __importDefault(require("express"));
const facilities_controller_1 = require("./facilities.controller");
const ValidationSchema_1 = __importDefault(require("../../middlewares/ValidationSchema"));
const facilities_validation_1 = require("./facilities.validation");
const auth_1 = require("../../middlewares/auth");
const user_contant_1 = require("../user/user.contant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(user_contant_1.USER_Role.admin), (0, ValidationSchema_1.default)(facilities_validation_1.facilitiesValidaions.createFacilitiesValidation), facilities_controller_1.facilitiesController.createFacility);
// router.post("/", facilitiesController.createFacility);
router.get("/", facilities_controller_1.facilitiesController.getAllFacility);
router.put("/:id", (0, auth_1.auth)(user_contant_1.USER_Role.admin), facilities_controller_1.facilitiesController.updateFacility);
router.delete("/:id", (0, auth_1.auth)(user_contant_1.USER_Role.admin), facilities_controller_1.facilitiesController.deleteFacility);
exports.facilitiesRouter = router;
