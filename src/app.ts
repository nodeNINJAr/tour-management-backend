import express, {  Request, Response } from 'express';
import cors from "cors"
import { router } from './routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';


// 
const app = express();



// middleware
app.use(express.json());
app.use(cors());




// 
app.use("/api/v1/", router)


// default route
app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        message:`Welcome Tour Management System Backend`
    })
})



// global error handelr
app.use(globalErrorHandler)



export default app

// db --> model --> services --> controller --> routeMatching