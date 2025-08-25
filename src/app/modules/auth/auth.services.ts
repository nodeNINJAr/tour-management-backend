import bcrypt from 'bcryptjs';
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import { generateToken } from '../../../utils/jwt';
import { envVars } from '../../confiq/env';


// 
const credentialsLogin = async(payLoad:Partial<IUser>)=>{
    //
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
const jwtPayload = {
    userId:isUserExist._id,
    email:isUserExist.email,
    role:isUserExist.role,
}

// 
const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_ACCESS_EXPIRES);
//
// delete isUserExist.password;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const {password:pass , ...rest} = isUserExist;


// 
return {
   accessToken,
   refreshToken,
   user:rest,
}

//  
}



export const  AuthServices = {
    credentialsLogin
} 