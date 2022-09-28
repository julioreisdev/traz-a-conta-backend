import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = Number(process.env.PORT) ? Number(process.env.PORT) : 5009;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING IN THE PORT ${PORT}`);
});
