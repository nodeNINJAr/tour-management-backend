import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.services";




// create user
const createUser = async(req:Request, res:Response, next:NextFunction)=>{
     try{
      
      // import from user services
      const user = await UserServices.createUser(req.body)
      // 
      res.status(httpStatus.CREATED).json({
         message:`User Created Successfully`,
         user
      })


     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     }catch(err:any){
      console.log(err);
      next(err)
      
     }

}


export const UserControllers = {
   createUser
}