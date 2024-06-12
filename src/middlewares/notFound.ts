import  { NextFunction, Request, Response} from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (err:any,req: Request, res: Response, next:NextFunction) =>{
    
  
    return res.status(404).json({
      success:false,
      statusCode:404,
      message: "Api Not Found",
      
    })
  }

  export default notFound