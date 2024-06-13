import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error.interface";
import handleValidationError from "../errors/handleValidationError";

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
        console.log(simplified)
    }


    res.status(500).json({
        success: false,
        message:err.name,
        errorSources
    })

}

export default globalErrorHandler