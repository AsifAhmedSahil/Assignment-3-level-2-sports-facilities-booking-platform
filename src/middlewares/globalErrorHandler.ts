import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error.interface";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler :ErrorRequestHandler = async(err,req,res,next) =>{

    let statusCode = 500;
    let message = "something went wrong";
    const errorSources: TErrorSources =[
        {
            path:"",
            message:"something wrong!"
        }
    ]

    if(err.name === 'ValidationError'){
        const simplified = handleValidationError(err)
        console.log(simplified)
    }


    res.status(500).json({
        success: false,
        message:"something went wrong",
        err:err 
    })

}

export default globalErrorHandler