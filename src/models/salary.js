// models/Salary.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Salary = sequelize.define(
  'Salary',
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
        model: 'users',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total_loans: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    final_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'salaries',
    createdAt: 'created_at',
    updatedAt: false,
  }
);

// Relationships
Salary.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Salary, {
  foreignKey: 'user_id',
});

export default Salary;