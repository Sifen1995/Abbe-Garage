const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const EmployeeInfo = sequelize.define("employee_info", {
  employee_info_id: {
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
  employee_first_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  employee_last_name: {
    type: DataTypes.STRING(255),
    allowNull: true, 
  },
  employee_phone: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "employee_info",  // ensure Sequelize uses exact table name
  timestamps: false            // disable createdAt & updatedAt if not used
});

module.exports = EmployeeInfo;
