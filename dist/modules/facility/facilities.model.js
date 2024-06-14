"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facilities = void 0;
const mongoose_1 = require("mongoose");
const facilitiesModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
        unique: true,
    },
    pricePerHour: {
        type: Number,
        required: [true, "Price is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
// facilitiesModel.pre("save",async function(next){
//     const isExistsFacilities = await Facilities.findOne({name:this.name})
//     if(isExistsFacilities){
//         throw new AppError(401,"facilities already exists!")
//     }
//     next()
// })
exports.Facilities = (0, mongoose_1.model)("Facilities", facilitiesModel);
