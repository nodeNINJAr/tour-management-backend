import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";


const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessTokens);
router.post("/logout", AuthControllers.userLogOut);
router.post("/reset-password",checkAuth(...Object.values(Role)), AuthControllers.resetPassword);
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
router.get("/google", async(req:Request, res:Response, next:NextFunction)=>{
    passport.authenticate("google", {scope:["profile", "email"]})(req, res, next)
});
router.get("/google/callback", passport.authenticate("google", {failureRedirect:"/login"}), AuthControllers.googleCallbackController)



// 
export const AuthRoutes = router;