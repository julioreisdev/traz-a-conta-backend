import express from "express";
import cors from "cors";
import authRouter from './routes/authRoutes'

const app = express();

app.use(express.json(), cors());

app.use(authRouter)

export default app;
