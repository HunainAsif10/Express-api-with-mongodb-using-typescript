import express from "express"
const app=express()
import cors from "cors"
import { PORT } from "./config"
import { connectToDB } from "./db"
import user from "./routes/user"
connectToDB()

app.use(express.json())
app.use(cors())


app.use("/user",user)


app.listen(PORT,()=>console.log(`Server is listenign in PORT ${PORT}`))