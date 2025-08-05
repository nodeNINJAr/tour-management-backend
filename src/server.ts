import {Server} from "http"
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { promise } from "zod";

// 
let server:Server;

const app = express();


const startServer = async()=>{
   try{
        await mongoose.connect("mongodb+srv://plantNet:wDjP7FWFqFN3D7aS@cluster0.pm9ea.mongodb.net/tour-DB?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Server connected to DB");
        //    
        server = app.listen(5000,()=>{
        console.log(`Server is running on the port 5000`);
        })
   }catch(err){
      console.log(err);
   }
}  

startServer();

// ** unhandled rejection error
process.on("unhandledRejection",(err)=>{
console.log("unhandle rejection detected... server sutting down", err);
  if(server){
    server.close(()=>{
        process.exit(1);
    })
  }
  process.exit(1);
});

// ** unCought rejection error
process.on("uncaughtException",(err)=>{
console.log("Uncought exception detected... server sutting down", err);
  if(server){
    server.close(()=>{
        process.exit(1);
    })
  }
  process.exit(1);
});
// ** singnal tarmination error
process.on("SIGTERM",(err)=>{
console.log("SIGTERM single recived... server sutting down", err);
  if(server){
    server.close(()=>{
        process.exit(1);
    })
  }
  process.exit(1);
});
// 
process.on("SIGINT",(err)=>{
console.log("SIGINT single recived... server sutting down", err);
  if(server){
    server.close(()=>{
        process.exit(1);
    })
  }
  process.exit(1);
});



// Promise.reject(new Error("i forgot to use try catch block"))
// throw new Error("Uncought exception detected")




