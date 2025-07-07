const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Employee = sequelize.define("employee", {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  employee_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    
  },
  employee_active_status: {
    type: DataTypes.ENUM("active", "pending", "disabled"),
    defaultValue: "pending",
  },
  employee_added_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "employee",  // ✅ Prevents Sequelize from pluralizing
  timestamps: false,
});

module.exports = Employee;
