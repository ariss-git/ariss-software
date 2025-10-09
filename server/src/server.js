import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("Server running on PORT:", PORT));
