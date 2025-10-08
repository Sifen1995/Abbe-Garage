const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const OrderService = sequelize.define(
  "order_services",
  {
    order_service_id: {
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
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "common_service", 
        key: "service_id",
      },
    },
    service_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "order_services",
    timestamps: false, 
  }
);

module.exports = OrderService;
