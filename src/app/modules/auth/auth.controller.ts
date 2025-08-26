/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { setAuthCookies } from './../../../utils/setCookie';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.services";



// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
    // 
   const loginInfo = await AuthServices.credentialsLogin(req.body);
  // sent res and info to set cookies 
   setAuthCookies(res, loginInfo)

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
   const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string);
    //  
    setAuthCookies(res, tokenInfo)
    //    
    sendResponse(res, {
    success:true, 
    statusCode:httpStatus.OK,
    message:"New Token Genarated Successfully",
    data:tokenInfo,
    })


})



const userLogOut = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{

    res.clearCookie("accessToken",{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    })  
    // 
   res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
   })
    //    
    sendResponse(res, {
    success:true, 
    statusCode:httpStatus.OK,
    message:"User Logged Out Successfully",
    data:null,
    })


})





export const  AuthControllers = {
    credentialsLogin,
    getNewAccessTokens,
    userLogOut,
} 