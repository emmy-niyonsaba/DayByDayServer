// models/UserRate.js

import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";
import User from "./user.js";

const UserRate = sequelize.define(
  "UserRate",
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

    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    payment_type: {
      type: DataTypes.ENUM("daily", "monthly"),
      allowNull: false,
    },
  },
  {
    tableName: "user_rates",
    underscored: true,
    timestamps: true,
  },
);

// Relationships
UserRate.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(UserRate, {
  foreignKey: "user_id",
});

export default UserRate;
