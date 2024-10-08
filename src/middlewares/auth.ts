import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUser_Role } from "../modules/user/user.interface";

export const auth = (...requiredRoles :TUser_Role[]) =>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        const tokenWithBearer = req.headers.authorization;
        console.log(tokenWithBearer)

        if(!tokenWithBearer){
            throw new AppError(401,"You are not authorized!")
        }
        if(tokenWithBearer){
            const token = tokenWithBearer.split(" ")[1]
            console.log("after cut bearer",token)
            
        

        if(!token){
            throw new AppError(401,"You are not authorized!")
        }

        const verifiedToken = jwt.verify(token as string , config.jwt_access_secret as string)
        console.log(verifiedToken)

    


        const {role,email} = verifiedToken as JwtPayload

        // check user exist in database or not

        const user = await User.findOne({email})
        if(!user){
            throw new AppError(404,"User not found!")
        }
        console.log("required roles",requiredRoles)
        console.log("roles",role)
        // console.log(requiredRoles.includes(role))
        // console.log(!requiredRoles.includes(role))

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(401,"You are not authorized!")
        }
    }
        next()
    })
}