import express, { NextFunction, Request, Response } from 'express';
import cors from "cors"
import { router } from './routes';
import { envVars } from './app/confiq/env';


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
app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
    res.status(500).json({
        success:false,
        message:`Something went wrong ${err.message} catch on global err handler `,
        err,
        // stack used for showing which line error come from 
        stack:envVars.NODE_ENV === "development" ? err.stack : null
    })
})






export default app

// db --> model --> services --> controller --> routeMatching