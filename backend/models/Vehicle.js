const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Vehicle = sequelize.define(
  "vehicles",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers", // Table name in DB
        key: "customer_id",
      },
    },
    vehicle_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vehicle_make: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vehicle_model: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vehicle_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vehicle_mileage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vehicle_tag: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vehicle_serial_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    vehicle_color: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "vehicles",
    timestamps: false, 
  }
);

module.exports = Vehicle;
