import { JwtPayload } from 'jsonwebtoken';
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";
import { envVars } from "../../confiq/env";



const createUser = async(payload:Partial<IUser>)=>{

       //    
       const {email,password, ...rest} = payload;
        // 
       const isExist = await User.findOne({email});
      //  
      //  if(isExist){
      //    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
      //  }
      //  hashed pass by bcript
       const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRIPT_SOLT_ROUND));
      //  
       const authProvider:IAuthProvider = {provider:"credentials", providerId:email as string}
       //
       const user = await User.create({
         email,
         password:hashedPassword,
         auths:[authProvider],
         ...rest
       }) 
    
       return user;

}


// update user
const updateUser = async(userId: string, payload: Partial<IUser>, decodedToken: JwtPayload)=>{


    // 
    const ifUserExist = await User.findById(userId);

      if(!ifUserExist){
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    if(ifUserExist.isDeleted || ifUserExist.isActive === IsActive.BLOCKED){
      throw new AppError(httpStatus.FORBIDDEN,"User Unable to update")
    }


    //  
    if(payload.role){
        if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
          throw new AppError(httpStatus.FORBIDDEN,"Your Are Not Authorized To Update this Role")
        }
    }
    // 
    if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
      throw new AppError(httpStatus.FORBIDDEN, "Your Are Not Authorized To Update this Role")
    }
    // 
    // if(payload.isActive || payload.isDeleted || payload.isVerified){
    //      if(decodedToken.role === Role.USER || Role.GUIDE){
    //          throw new AppError(httpStatus.FORBIDDEN, "Your Are Not Authorized")
    //      }
    // }
    // 
    if(payload.password){
        payload.password = await bcrypt.hash(payload.password, Number(envVars.BCRIPT_SOLT_ROUND))
  }
  
  //  send to database
  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {new:true, runValidators:true})

  return newUpdateUser;


}









    // get all users
    const getAllUsers =async()=>{
      
      const users = await User.find({});

      // total users
      const totalUsers = await User.countDocuments();
      //  
      return {
        data:users,
        meta:{
          total:totalUsers
        }
      }
    }







// 

export const UserServices = {
    createUser,
    getAllUsers,
    updateUser,
}