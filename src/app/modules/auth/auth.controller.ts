import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.services";



// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
    
    // 
   const loginInfo = await AuthServices.credentialsLogin(req.body);
   // acces token set to cookie    
   res.cookie("accessToken", loginInfo.accessToken,{
     httpOnly:true,
     secure:false,
   })    

   // refrsh token set to cookies
   res.cookie("refreshToken", loginInfo.refreshToken,{
     httpOnly:true,
     secure:false,
   })    

    //    
    sendResponse(res, {
    success:true, 
    statusCode:httpStatus.OK,
    message:"User Login Successfully",
    data:loginInfo,
    });
})



// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getNewAccessTokens = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
    // 
    const refreshToken = req.cookies.refreshToken;
    // 
   const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)
    //    
    sendResponse(res, {
    success:true, 
    statusCode:httpStatus.OK,
    message:"New Token Genarated Successfully",
    data:tokenInfo,
    })


})



export const  AuthControllers = {
    credentialsLogin,
    getNewAccessTokens
} 