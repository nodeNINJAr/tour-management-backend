import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


// signin to jwt
export const generateToken =(payload:JwtPayload, secret:string, expiresIn:string)=>{
    // 
     const token = jwt.sign(payload, secret, {
        expiresIn
     } as SignOptions)

     return token;
} 


// verify token
export const verifyToken =(token:string, secret:string)=>{
    // 
   const verifiedToken = jwt.verify(token, secret);
   //    
   return verifiedToken;
}