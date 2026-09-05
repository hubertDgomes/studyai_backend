import express, { json } from 'express'
import dbConnertor from './config/dbConnector.js'
import authRouter from './routes/authRoutes.js'
import documentRouter from './routes/documentsRouter.js'
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express()



app.use(json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));


app.get("/" ,(req, res) => {
    res.json({message : "The server is running!"})
})

dbConnertor()

app.use("/api" , authRouter)
app.use("/api/ai", documentRouter)

app.listen(4000,()=> {
    console.log("The server is running at port 4000");
})