import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./routes/index.route";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", mainRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is working on this URI");
});

export default app;
