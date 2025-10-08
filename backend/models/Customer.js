const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Customer_identifier=sequelize.define("customers",{
   customer_id:{
    primaryKey:true,
    type:DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false
   } ,
   customer_email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
   },
   customer_phone_number:{
    type:DataTypes.STRING,
    allowNull:true,
    unique:true
   },
   customer_added_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "customers",  
  timestamps: false,


})

module.exports=Customer_identifier