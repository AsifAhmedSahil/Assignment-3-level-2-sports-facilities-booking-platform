import { TErrorSources } from "../interface/error.interface";

const handleDuplicateError = (err:any) =>{
    const match = err.message.match(/"([^"]*)"/)
    const extractMessage = match && match[1];
    const errorSources :TErrorSources = [
        {
            path:"",
            message:`${extractMessage} already exists`
        }
    ]
    return {
        message:err.errmsg,
        errorSources
    }
}

export default handleDuplicateError