// models/Permission.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    leave_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    return_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        'pending',
        'approved',
        'rejected'
      ),
      defaultValue: 'pending',
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: 'permission',
    timestamps: false,
  }
);

// Relationships
Permission.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Permission, {
  foreignKey: 'user_id',
});

export default Permission;