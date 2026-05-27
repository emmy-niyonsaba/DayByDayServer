// models/Loan.js

import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";
import User from "./user.js";

const Loan = sequelize.define(
  "Loan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: "users",
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "loan",
    createdAt: "created_at",
    updatedAt: false,
  },
);

// Relationships
Loan.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Loan, {
  foreignKey: "user_id",
});

export default Loan;
