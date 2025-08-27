/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { createUserTokens } from './../../../utils/userTokens';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { setAuthCookies } from './../../../utils/setCookie';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.services";
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import { envVars } from '../../confiq/env';
import passport from 'passport';



// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body)

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {

            // ❌❌❌❌❌
            // throw new AppError(401, "Some error")
            // next(err)
            // return new AppError(401, err)


            // ✅✅✅✅
            // return next(err)
            console.log("from err", err);
            return next(new AppError(401, err))
        }

        if (!user) {
            // console.log("from !user");
            // return new AppError(401, info.message)
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserTokens(user)

        // delete user.toObject().password

        const { password: pass, ...rest } = user.toObject()


        setAuthCookies(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })


    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })


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


// 
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

// reset password
const resetPassword = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
    // 
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    // 
    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)
    //    
    sendResponse(res, {
    success:true, 
    statusCode:httpStatus.OK,
    message:"Password reset Successfully",
    data:null,
    })


})


// googleCallbackController
const googleCallbackController = catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
    // 
    let redirectTo = req.query.state ? req.query.state as string : "" ;

    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1)
    } 

    // 
    const user = req.user;
    // 
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User Not found")
    }
    // 
    const tokenInfo = await createUserTokens(user)
    // 
    setAuthCookies(res,tokenInfo)
    //    
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)

})




export const  AuthControllers = {
    credentialsLogin,
    getNewAccessTokens,
    userLogOut,
    resetPassword,
    googleCallbackController
} 