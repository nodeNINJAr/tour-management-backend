import { envVars } from "../app/confiq/env";
import { IUser } from "../app/modules/user/user.interface";
import { generateToken } from "./jwt";



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