/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcryptjs';
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import { createNewAccessTokenByRefreshToken, createUserTokens } from '../../../utils/userTokens';
import { JwtPayload } from 'jsonwebtoken';
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

const userTokens = await createUserTokens(isUserExist);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const {password:pass , ...rest} = isUserExist.toObject();


// 
return {
   accessToken:userTokens.accessToken,
   refreshToken:userTokens.refreshToken,
   user:rest,
}

//  
}




// 
const getNewAccessToken = async(refreshToken:string)=>{
  const newAccessToken = await createNewAccessTokenByRefreshToken(refreshToken)

// 
return {
   accessToken:newAccessToken
}

//  
}

  // reset password
 const resetPassword = async(oldPassword:string, newPassword:string, decodedToken:JwtPayload)=>{
   // 
   const user = await User.findById(decodedToken.userId)
   //
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const isOldPasswordMatched = await bcrypt.compare(oldPassword, user!.password as string)
  // 
   if(!isOldPasswordMatched){
      throw new AppError(httpStatus.FORBIDDEN, "Old password does not match")
   };
   // 
   user!.password   = await bcrypt.hash(newPassword, Number(envVars.BCRIPT_SOLT_ROUND));
   
   user!.save();
    
   //  
}



export const  AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
} 