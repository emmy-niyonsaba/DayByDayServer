// models/User.js

import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";
import UserCategory from "./userCategory.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    telephone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: "user_category",
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "users",
    underscored: true,
    timestamps: true,
  },
);

// Relationships
User.belongsTo(UserCategory, {
  foreignKey: "category_id",
});

UserCategory.hasMany(User, {
  foreignKey: "category_id",
});

export default User;
