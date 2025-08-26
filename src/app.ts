import express, {  Request, Response } from 'express';
import cors from "cors"
import { router } from './routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFoundHandler';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from "express-session";
import "./app/confiq/passport"
import { envVars } from './app/confiq/env';


// 
const app = express();


// middleware
app.use(expressSession({
    secret:envVars.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(cookieParser());


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
app.use(notFound)

export default app

// db --> model --> services --> controller --> routeMatching