import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.services";



// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
    // 
   const loginInfo = await AuthServices.credentialsLogin(req.body)


//    
 sendResponse(res, {
   success:true, 
   statusCode:httpStatus.OK,
   message:"User Login Successfully",
   data:loginInfo,
})


})



export const  AuthControllers = {
    credentialsLogin
} 