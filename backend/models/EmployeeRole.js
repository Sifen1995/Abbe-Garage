// models/employee_role.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Employee_role = sequelize.define(
  "employee_role",
  {
    employee_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_role_id: {
  type: DataTypes.INTEGER,
  allowNull: false, // still fine
  references: {
    model: 'company_roles',
    key: 'company_role_id',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
},

    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "employee", 
        key: "employee_id",
      },
    },
  },
  {
    tableName: "employee_role",
    timestamps: false,
  }
);

module.exports = Employee_role;
