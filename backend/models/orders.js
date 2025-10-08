const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Orders = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers", // table name in DB
        key: "customer_id",
      },
    },
    employee_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "employee", // table name in DB
        key: "employee_id",
      },
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    order_hash: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    order_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: false, // disable createdAt/updatedAt
  }
);

module.exports = Orders;
