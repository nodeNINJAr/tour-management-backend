import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";



const createUser = async(payload:Partial<IUser>)=>{
       //    
       const {email,password, ...rest} = payload;
        // 
       const isExist = await User.findOne({email});
      //  
       if(isExist){
         throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
       }
      //  hasded pass by bcript
       const hashedPassword = await bcrypt.hash(password as string, 10);
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
    getAllUsers
}