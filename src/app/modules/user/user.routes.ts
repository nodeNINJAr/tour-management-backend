/* eslint-disable no-console */
import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validationReq";
import { Role } from './user.interface';
import { checkAuth } from '../../middleware/checkAuth';



// 
const router = Router();


// 
router.post('/register', validationRequest(createUserZodSchema), UserControllers.createUser);
// 
router.patch("/:id", checkAuth(...Object.values(Role)), UserControllers.updateUser) // make all arr of str to str
// 
router.get('/all-users', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUsers);

export const UserRoutes = router;