import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import tablesRoutes from "./routes/tableRoutes";
import productsRoutes from "./routes/productsRoutes";
import requestRoutes from "./routes/requestsRoutes";
import attendantsRoutes from "./routes/attendantsRoutes";
import testRoutes from './routes/testRoutes'

const app = express();

app.use(express.json(), cors());

app.use(authRoutes);
app.use(tablesRoutes);
app.use(productsRoutes);
app.use(requestRoutes);
app.use(attendantsRoutes);
app.use(testRoutes)

export default app;
