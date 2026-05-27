// models/Discipline.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Discipline = sequelize.define(
  'Discipline',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    attachment: {
      type: DataTypes.STRING,
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
  },
  {
    tableName: 'discipline',
    timestamps: false,
  }
);

// Relationships
Discipline.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Discipline, {
  foreignKey: 'user_id',
});

export default Discipline;