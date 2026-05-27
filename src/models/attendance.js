// models/Attendance.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Attendance = sequelize.define(
  'Attendance',
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

    attendance: {
      type: DataTypes.ENUM('full_day', 'partial'),
      allowNull: false,
    },
  },
  {
    tableName: 'attendance',
    timestamps: false,
  }
);

// Relationships
Attendance.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Attendance, {
  foreignKey: 'user_id',
});

export default Attendance;