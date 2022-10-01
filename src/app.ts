import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes'
import tablesRoutes from './routes/tableRoutes'

const app = express();

app.use(express.json(), cors());

app.use(authRoutes)
app.use(tablesRoutes)

export default app;
