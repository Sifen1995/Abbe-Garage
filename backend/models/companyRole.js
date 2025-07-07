const {DataTypes}=require("sequelize")
const sequelize=require("../config/db.config")

const Company_roles=sequelize.define("company_roles",{
  company_role_id :{
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    
   } ,
   company_role_name:{type:DataTypes.STRING,
    allowNull: false,
    unique: true,
   }
},
{ tableName: 'company_roles',
  timestamps: false

}
)

module.exports = Company_roles;








