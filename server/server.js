import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routers/authRoutes.js";
import userRouter from "./routers/userRoutes.js";


const app = express();
const port = process.env.PORT || 4000


connectDB();

const allowedOrigins = ['http://localhost:5173']


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }))


//API endpoints
app.get('/', (req, res) => res.send("API working fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, () => console.log(`Server started at port: ${port}`));