import mongoose from "mongoose"
import { MONGO_URL } from "./config"

const URL:any=MONGO_URL;
export const connectToDB=async()=>{
    try {
        await mongoose.connect(URL);
        console.log("DataBase Connected")
    } catch (error) {
        console.error(error)
    }
    
}