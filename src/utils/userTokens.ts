import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../app/confiq/env";
import AppError from "../app/errorHelpers/AppError";
import { IsActive, IUser } from "../app/modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from "http-status-codes"
import { User } from "../app/modules/user/user.model";



export const createUserTokens = async(user : Partial<IUser>)=>{
     // 
     const jwtPayload = {
         userId:user._id,
         email:user.email,
         role:user.role,
     }
     
     // 
     const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
     const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_ACCESS_EXPIRES);

    return {
        accessToken,
        refreshToken,
    }
}



// 
export const createNewAccessTokenByRefreshToken= async(refreshToken: string)=>{
   
 const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;

    //
  const isUserExist = await User.findOne({email:verifiedRefreshToken.email});
 //   
  if(!isUserExist){
     throw new AppError(httpStatus.BAD_REQUEST, "Email Does Not exist")
  }  
  //  
    if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE){
     throw new AppError(httpStatus.BAD_REQUEST, `user is ${isUserExist.isActive}`)
  }  
  //  
  if(isUserExist.isDeleted){
     throw new AppError(httpStatus.BAD_REQUEST, `user is deleted`)
  }

  // 
const jwtPayload = {
    userId:isUserExist._id,
    email:isUserExist.email,
    role:isUserExist.role,
}

// 
const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);


// 
return accessToken


}