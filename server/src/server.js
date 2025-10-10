import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./api/routes/index.route.js";
import _redisClient from "./utils/redis-client.js";

dotenv.config();
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

app.listen(PORT, () => console.log("Server running on PORT:", PORT));
