const Employee=require("./Employee");
const EmployeeInfo=require("./EmployeeInfo");
const EmployeePassword=require("./EmployeePassword");
const EmployeeRole=require("./EmployeeRole");
const CompanyRoles=require("./companyRole")
const Customer_identifier=require("./Customer")
const Customer_info=require("./CustomerInfo")
const CommonService=require("./commonService")
const Orders =require("./orders")
const OrderInfo=require("./orderInfo")
const OrderService=require("./orderService")
const OrderStatus=require("./orderStatus")
const Vehicle=require("./Vehicle")


Employee.hasOne(EmployeeInfo, { foreignKey: "employee_id", onDelete:'CASCADE', as: 'EmployeeInfoDetail' }); 
EmployeeInfo.belongsTo(Employee, { foreignKey: "employee_id",as: 'EmployeeInfoDetail' });

Employee.hasOne(EmployeePassword, { foreignKey: 'employee_id', onDelete: 'CASCADE', as: 'PasswordDetail' }); 
EmployeePassword.belongsTo(Employee,{ foreignKey: "employee_id" });

Employee.hasOne(EmployeeRole, { foreignKey: 'employee_id', onDelete: 'CASCADE', as: 'EmployeeRoleDetail' }); 
EmployeeRole.belongsTo(Employee, { foreignKey: "employee_id" });

CompanyRoles.hasMany(EmployeeRole, { foreignKey: "company_role_id", onDelete: "SET NULL" });
EmployeeRole.belongsTo(CompanyRoles, { foreignKey: "company_role_id", as: 'CompanyRoleDetail' }); 

Customer_identifier.hasOne(Customer_info, { foreignKey: "customer_id", onDelete:'CASCADE', as: 'CustomerInfoDetail' }); 
Customer_info.belongsTo(Customer_identifier, { foreignKey: "customer_id", as: 'CustomerInfoDetail' });

Customer_identifier.hasMany(Vehicle, { foreignKey: "customer_id", onDelete:'CASCADE', as: 'CustomerVehicleInfo' }); 
Vehicle.belongsTo(Customer_identifier,{foreignKey:"customer_id"})

Customer_identifier.hasMany(Orders,{foreignKey:"customer_id", onDelete:'CASCADE', as: 'CustomerOrderInfo'})
Orders.belongsTo(Customer_identifier,{foreignKey:"customer_id"})

Employee.hasMany(Orders,{foreignKey:"employee_id",onDelete:'CASCADE' ,as:'EmployeeOrderDetail'})
Orders.belongsTo(Employee,{foreignKey:"employee_id"})

Orders.hasOne(OrderInfo,{foreignKey:"order_id", onDelete:'CASCADE',as:'OrderInfoDetail'})
OrderInfo.belongsTo(Orders,{foreignKey:"order_id"})

// Orders.hasMany(OrderStatus,{foreignKey:"order_id", onDelete:'CASCADE',as:'OrderStatusDetail'})
// OrderStatus.belongsTo(Orders,{foreignKey:"order_id",as:'OrderStatusDetail'})

Orders.belongsTo(OrderStatus, { foreignKey: 'order_status_id', as: 'OrderStatusDetail' })

Orders.hasOne(OrderService,{foreignKey:"order_id", onDelete:'CASCADE',as:'OrderServiceDetail'})
OrderService.belongsTo(Orders,{foreignKey:"order_id",as:'OrderServiceDetail'})

CommonService.hasMany(OrderService,{foreignKey:'service_id' ,onDelete:'CASCADE',  as: 'CommonServiceOrder'})
OrderService.belongsTo(CommonService,{foreignKey:"service_id", as: 'CommonServiceOrder'})

module.exports = {
 Employee,
 EmployeeInfo,
 EmployeePassword,
 EmployeeRole,
 CompanyRoles,
 Customer_identifier,
 Customer_info,
 CommonService,
 Vehicle,
 Orders,
 OrderInfo,
 OrderService,
 OrderStatus
};