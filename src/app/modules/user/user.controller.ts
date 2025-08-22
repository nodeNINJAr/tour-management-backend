import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.services";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";




// create user
// const createUser = async(req:Request, res:Response, next:NextFunction)=>{
//      try{
       
      // throw new AppError(httpStatus.BAD_REQUEST,"fake error")

      // import from user services
      // const user = await UserServices.createUser(req.body)
      // // 
      // res.status(httpStatus.CREATED).json({
      //    message:`User Created Successfully`,
      //    user
      // })


     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//      }catch(err:any){
//       console.log(err);
//       next(err)
      
//      }

// }



// cretae user

const createUser =  catchAsync(async(req:Request, res:Response , next:NextFunction)=>{
   const user = await UserServices.createUser(req.body)

 sendResponse(res, {
   success:true,
   statusCode:httpStatus.CREATED,
   message:"User Created Successfully",
   data:user,
})


})






// get all users
const getAllUsers = catchAsync((async(req:Request, res:Response , next:NextFunction)=>{
  const result = await UserServices.getAllUsers();

// 
sendResponse(res, {
   success:true,
   statusCode:httpStatus.OK,
   message:"User Retrived Successfully",
   data:result.data,
   meta:result.meta
})

}));






export const UserControllers = {
   createUser,
   getAllUsers
}