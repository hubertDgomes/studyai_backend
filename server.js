import express, { json } from 'express'
import dbConnertor from './config/dbConnector.js'
import authRouter from './routes/authRoutes.js'
import documentRouter from './routes/documentsRouter.js'
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express()



app.use(json())
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
   "https://studyai-client.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin) || origin.endsWith(".onrender.com")) {
            return callback(null, true);
        }
        return callback(null, true); // Fallback allow for frontend
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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