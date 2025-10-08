const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const OrderStatus = sequelize.define(
  "order_status",
  {
    order_status_id: {
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
    order_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "order_statuses",
    timestamps: false, 
  }
);

module.exports = OrderStatus;
