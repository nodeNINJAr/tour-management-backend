import dotEnv from "dotenv"
dotEnv.config();

// 
interface EnvConfig {
    PORT:string,
    DB_URL:string,
    NODE_ENV: "development" | "production",
    JWT_ACCESS_SECRET:string,
    JWT_ACCESS_EXPIRES:string,
    BCRIPT_SOLT_ROUND:string,
}


// 
const loadEnvVars =():EnvConfig => {

// 
const requiredEnvVariables : string[] = ["PORT", "DB_URL", "NODE_ENV","JWT_ACCESS_SECRET","JWT_ACCESS_EXPIRES","BCRIPT_SOLT_ROUND"];
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
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES:process.env.JWT_ACCESS_EXPIRES as string,
    BCRIPT_SOLT_ROUND:process.env.BCRIPT_SOLT_ROUND as string,
}
}


export const envVars:EnvConfig = loadEnvVars();