/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../confiq/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interface";


// 
export const checkAuth = (...authRoles:string[]) => async(req:Request, res:Response, next:NextFunction)=>{
    //  
    try{
      const accessToken = req.headers.authorization;
      if(!accessToken){
        throw new AppError(403, "No Token Found")
      }
    //   
    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

  const isUserExist = await User.findOne({email:verifiedToken.email});
   //   
  if(!isUserExist){
     throw new AppError(httpStatus.BAD_REQUEST, "Email Does Not exist")
  }  
  //  
    if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE){
     throw new AppError(httpStatus.BAD_REQUEST, `user is ${isUserExist.isActive}`)
  }  
  //  
  if(isUserExist.isDeleted){
     throw new AppError(httpStatus.BAD_REQUEST, `user is deleted`)
  }
    // 
    if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, "Role not permitted to access this route")
    }
    // 
    req.user = verifiedToken
    // 
    next();
    }
    // 
   catch(err){
    console.log("jwt error", err);
    next(err)
 }
}
