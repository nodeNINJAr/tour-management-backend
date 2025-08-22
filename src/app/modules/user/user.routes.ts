import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validationReq";



// 
const router = Router();




// 
router.post('/register', validationRequest(createUserZodSchema), UserControllers.createUser);

// 
router.get('/all-users', UserControllers.getAllUsers);

export const UserRoutes = router;