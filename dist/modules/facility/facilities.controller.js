"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitiesController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const facilities_service_1 = require("./facilities.service");
const createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {name} = req.body;
    // const isfacilitiesExists = await Facilities.findOne({name:name})
    // if(isfacilitiesExists){
    //   throw new AppError(401,"Facilities already exists!")
    // }
    const result = yield facilities_service_1.facilitiesServices.createFacilityIntoDB(req.body);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Facility added successfully",
        data: result,
    });
}));
const getAllFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield facilities_service_1.facilitiesServices.getAllFacilityFromDB();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "All Facilities retrieved Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield facilities_service_1.facilitiesServices.updateFacilityIntoDB(id, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: " Facilities updated Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: [],
        });
    }
}));
const deleteFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield facilities_service_1.facilitiesServices.delteFacilityFromDB(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: " Facilities Deleted Successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            statusCode: 404,
            message: " Failed to delete facilities !",
        });
    }
}));
exports.facilitiesController = {
    createFacility,
    getAllFacility,
    updateFacility,
    deleteFacility
};