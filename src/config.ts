import {config} from "dotenv"
config()



export const PORT=process.env.PORT
export const MONGO_URL:string |undefined=process.env.MONGO_URL
export const JWT_SEC:any=process.env.JWT_SEC