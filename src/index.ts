import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import 'reflect-metadata'
import routes from "./routes/index"
import {errorMiddleware} from './middlewares/error.middleware'
import { DatabaseConnection } from "./patterns/singleton/database";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api", routes)
app.use(errorMiddleware)

const startServer = async()=>{
    try {
        const dbConnection = DatabaseConnection.getInstance()
        await dbConnection.initialize()
        console.log("Database connected")
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}`)
        })

    } catch (error) {
        console.error("Error connecting to database:",error)
        process.exit(1)
    }  
}

startServer()