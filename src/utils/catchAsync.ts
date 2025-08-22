import { NextFunction, Request, Response } from "express";

// async handler
type AsyncHandler = (req:Request, res:Response, next:NextFunction) => Promise<void>


// 
export const catchAsync =(fn:AsyncHandler)=>(req:Request, res:Response, next:NextFunction)=>{
   Promise.resolve(fn(req, res, next)).catch((err)=>{
      console.log(err);
      next(err);
   })
}
