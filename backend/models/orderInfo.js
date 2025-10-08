const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const OrderInfo = sequelize.define(
  "order_info",
  {
    order_info_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders", 
        key: "order_id",
      },
    },
    order_total_price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: true,
    },
    order_estimated_completion_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    order_completion_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    order_additional_requests: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order_additional_requests_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: "order_infos",
    timestamps: false, 
  }
);

module.exports = OrderInfo;
