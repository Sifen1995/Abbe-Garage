const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const CommonService = sequelize.define(
  "common_services",
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    service_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    service_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "common_services",
    timestamps: false,
  }
);

module.exports = CommonService;
