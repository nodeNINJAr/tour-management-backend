import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";




const router = Router();


router.post("/create", checkAuth())