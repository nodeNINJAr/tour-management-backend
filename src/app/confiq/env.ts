import dotEnv from "dotenv"
dotEnv.config();

// 
interface EnvConfig {
    PORT:string,
    DB_URL:string,
    NODE_ENV: "development" | "production"
}


// 
const loadEnvVars =():EnvConfig => {

// 
const requiredEnvVariables : string[] = ["PORT", "DB_URL", "NODE_ENV"];
    // 
    requiredEnvVariables.forEach(key=>{
       if(!process.env[key]){
         throw new Error(`Missing env variables ${key}`)
       }    
    })

    // 
   return {
    PORT:process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL:process.env.DB_URL!,
    NODE_ENV:process.env.NODE_ENV as "development" | "production",
}
}


export const envVars:EnvConfig = loadEnvVars();