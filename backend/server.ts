import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
