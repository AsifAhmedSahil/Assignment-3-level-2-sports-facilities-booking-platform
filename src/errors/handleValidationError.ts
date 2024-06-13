import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

const handleValidationError = (err: mongoose.Error.ValidationError) =>{
    const errorSources:TErrorSources = Object.values(err.errors).map((val :mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
        return {
            path:val?.path,
            message: val?.message
        }
    })


    return {
        message: "Validation Error",
        errorSources
    }

}

export default handleValidationError