const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Customer_info = sequelize.define(
  "customer_infos",
  {
    customer_info_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },

    customer_first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_active_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "customer_infos",
    timestamps: true, 
    createdAt: false, 
    
  }
);

module.exports = Customer_info;
