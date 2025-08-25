import { envVars } from './../app/confiq/env';
/* eslint-disable no-console */

import { User } from "../app/modules/user/user.model";
import { IAuthProvider, IUser, Role } from '../app/modules/user/user.interface';
import bcrypt from "bcryptjs"




export const seedSuperAdmin =async()=>{
    // 
      try{
        const isSuperAdminExist = await User.findOne({email:envVars.SUPER_ADMIN_EMAIL});
        // 
        if(isSuperAdminExist){
            console.log("Super Admin alredy exists");
            return 
        }

    //  hasded pass by bcript
        const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASS, Number(envVars.BCRIPT_SOLT_ROUND));
        //  
        const authProvider:IAuthProvider = {provider:"credentials", providerId:envVars.SUPER_ADMIN_EMAIL}

    // 
    const payLoad:IUser = {
        name:"Super Admin",
        email:envVars.SUPER_ADMIN_EMAIL,
        role:Role.SUPER_ADMIN,
        isVerified:true,
        password:hashedPassword,
        auths:[authProvider]
    }
      //    
      const superAdmin = await User.create(payLoad);
      console.log("SuperAdmin Created Successfully! \n");
      console.log(superAdmin);
      }catch(err){
        console.log(err);
      }
}