const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Customer_identifier=sequelize.define("customer_identifier")