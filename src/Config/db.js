import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    dialectOptions:
      process.env.PGSSLMODE === "require"
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to synchronize the models:", err);
  });

export default sequelize;
