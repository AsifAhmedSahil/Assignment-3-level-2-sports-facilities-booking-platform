import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error.interface";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import config from "../config";

const globalErrorHandler :ErrorRequestHandler = async(err,req,res,next) =>{

    let statusCode = 500;
    let message = err.message || "something went wrong";
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
        console.log(err)
        const simplified = handleDuplicateError(err)
        errorSources = simplified.errorSources
        message = simplified.message
    }

    if(err instanceof ZodError){
        // console.log("zod error",err)
        const simplified = handleZodError(err);
        errorSources = simplified.errorSources
        message= simplified.message
    }

    console.log("find authentication error",err)

    res.status(500).json({
        success: false,
        message,
        errorSources,
        stack: config.node_env === 'development' ? err?.stack :null
    })

}

export default globalErrorHandler