import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/Config/db.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

import userRoutes from "./src/routers/userRoutes.js";
import userCategoryRoutes from "./src/routers/userCategoryRoutes.js";
import userRatesRoutes from "./src/routers/userRatesRoutes.js";
import attendanceRoutes from "./src/routers/attendanceRoutes.js";
import disciplineRoutes from "./src/routers/disciplineRoutes.js";
import loanRoutes from "./src/routers/loanRoutes.js";
import permissionRoutes from "./src/routers/permissionRoutes.js";
import salaryRoutes from "./src/routers/salaryRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/user-categories", userCategoryRoutes);
app.use("/api/user-rates", userRatesRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/disciplines", disciplineRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/salaries", salaryRoutes);

app.get("/health", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

await sequelize.sync();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
