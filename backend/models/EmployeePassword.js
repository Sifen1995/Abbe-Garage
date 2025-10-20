const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const EmployeePassword = sequelize.define("employee_password", {
  employee_pass_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: "employee", 
        key: "employee_id",
      },
  },
  employee_password_hashed: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: "employee_password", // explicit table name
  timestamps: false               // disable createdAt/updatedAt
});

module.exports = EmployeePassword;
