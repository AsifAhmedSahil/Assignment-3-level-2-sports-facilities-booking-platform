import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error.interface";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";

const globalErrorHandler :ErrorRequestHandler = async(err,req,res,next) =>{

    let statusCode = 500;
    let message = "something went wrong";
    let errorSources: TErrorSources =[
        {
            path:"",
            message:"something wrong!"
        }
    ]

    if(err.name === 'ValidationError'){
        const simplified = handleValidationError(err)
        errorSources = simplified.errorSources
        // console.log(simplified)
    }else if(err.name === "CastError"){
        const simplified = handleCastError(err)
        errorSources = simplified.errorSources
    }else if(err.code === 11000){
        const simplified = handleDuplicateError(err)
        errorSources = simplified.errorSources
    }

    res.status(500).json({
        success: false,
        message,
        errorSources
    })

}

export default globalErrorHandler