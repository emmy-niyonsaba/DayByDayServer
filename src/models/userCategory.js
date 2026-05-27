import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserCategory = sequelize.define(
  'UserCategory',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    category_name: {
      type: DataTypes.ENUM(
        'admin',
        'supervisor',
        'manpower',
        'contractor'
      ),
      allowNull: false,
    },
  },
  {
    tableName: 'user_category',
    timestamps: false,
  }
);

export default UserCategory;