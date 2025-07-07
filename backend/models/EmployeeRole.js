const {DataTypes}=require("sequelize")
const sequelize=require("../config/db.config")

const Employee_role=sequelize.define("employee_role",{
   employee_role_id:{
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    //defaultValue: DataTypes.INTEGER
   } ,
   	company_role_id:{
    type: DataTypes.INTEGER, 
    allowNull: false
    },
    employee_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  },
  {
    tableName: 'employee_role',
  timestamps: false
  }
)

module.exports = Employee_role;