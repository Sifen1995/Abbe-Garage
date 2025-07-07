const Employee=require("./Employee");
const EmployeeInfo=require("./EmployeeInfo");
const EmployeePassword=require("./EmployeePassword");
const EmployeeRole=require("./EmployeeRole");
const CompanyRoles=require("./companyRole")


Employee.hasOne(EmployeeInfo,{foreignKey:"employee_id",onDelete:'CASCADE'});
EmployeeInfo.belongsTo(Employee, { foreignKey: "employee_id"});

Employee.hasOne(EmployeePassword, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
EmployeePassword.belongsTo(Employee,{  foreignKey: "employee_id"});

Employee.hasOne(EmployeeRole, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
EmployeeRole.belongsTo(Employee, {  foreignKey: "employee_id"});

CompanyRoles.hasMany(EmployeeRole, {foreignKey: "company_role_id", onDelete: "SET NULL"});
EmployeeRole.belongsTo(CompanyRoles, { foreignKey: "company_role_id"});

module.exports = {
  Employee,
  EmployeeInfo,
  EmployeePassword,
  EmployeeRole,
  CompanyRoles
};
