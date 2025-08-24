import bcrypt from 'bcryptjs';
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';


// 
const credentialsLogin = async(payLoad:Partial<IUser>)=>{
   console.log(payLoad);
   const {email, password} = payLoad;
  // is user exist
  const isUserExist = await User.findOne({email});
 //   
  if(!isUserExist){
     throw new AppError(httpStatus.BAD_REQUEST, "Email Does Not exist")
  }  
 
//   is passwordmatched
const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string) 
 //password compare
 if(!isPasswordMatched){
   throw new AppError(httpStatus.BAD_REQUEST, "Password is not matched")
 } 

// 
return {
  email:isUserExist.email,
}


//  
}





export const  AuthServices = {
    credentialsLogin
} 