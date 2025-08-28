import { validationRequest } from './../../middleware/validationReq';
/* eslint-disable no-console */
import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { Role } from './user.interface';
import { checkAuth } from '../../middleware/checkAuth';



// 
const router = Router();


// 
router.post('/register', UserControllers.createUser);
// 
router.patch("/:id",validationRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser) // make all arr of str to str
// 
router.get('/all-users', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers);

export const UserRoutes = router;