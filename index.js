import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(cors());
dotenv.config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

import userRoutes from "./routers/userRouter.js";

app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
