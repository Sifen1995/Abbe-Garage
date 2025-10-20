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
   
    order_status: {
     type: DataTypes.ENUM('Pending','In Progress','On Hold','Completed','Delivered', 'Cancelled'),  
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "order_status",
    timestamps: false, 
  }
);

module.exports = OrderStatus;
