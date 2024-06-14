import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error.interface";

const handleZodError = (err:ZodError) =>{
    
    const errorSources:TErrorSources = err.issues.map((issue:ZodIssue) =>{
        return{
            path: issue.path[issue.path.length-1],
            message:issue.message
        }
    })

    return{
        
        message:"Zod validation error",
        errorSources
    }

}

export default handleZodError