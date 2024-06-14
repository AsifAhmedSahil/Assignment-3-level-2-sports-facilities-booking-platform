import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

const handleCastError =(err:mongoose.Error.CastError) =>{
    const errorSources:TErrorSources =  [
        {
            path:err.path,
            message:err.message
        }
    ]

    return {
        message: "CastError",
        errorSources
    }
}

export default handleCastError