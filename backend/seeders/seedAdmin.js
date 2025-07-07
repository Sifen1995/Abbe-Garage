const bycrpt=require("bcrypt")
const {Employee,EmployeeInfo,
  EmployeePassword,
  EmployeeRole,
  CompanyRoles}=require("../models");

const dotenv=require("dotenv")

dotenv.config()

async function seedAdmin( ) {
    const adminEmail=process.env.ADMINEMAIL
    const existing=await Employee.findOne({where:{employee_email:adminEmail}})

    if (existing) {
        console.log("Admin already exists.")
        return
    }

    let adminRole = await CompanyRoles.findOne({ where: { company_role_name: 'admin' } });
  if (!adminRole) {
    adminRole = await CompanyRoles.create({ company_role_name: 'admin' });
    console.log('✅ Created company role: admin');
  }

  const employee=await Employee.create({
    employee_email:process.env.ADMINEMAIL,
    status: 'active'
  });
  await EmployeeInfo.create({
    employee_id: employee.employee_id,
    employee_first_name:"system ",	
    employee_last_name:"admin"	,
    employee_phone:"+251900000000"	
  })

  const hashedPassword= await bycrpt.hash(process.env.ADMINPASSWORD,10)
  await EmployeePassword.create({
    employee_id: employee.employee_id,
    employee_password_hashed:hashedPassword,  
    
  })

  await EmployeeRole.create({
    employee_id: employee.employee_id,
    company_role_id:adminRole.company_role_id ,    
  });
   console.log("admin created sucssefully")
} 

module.exports = seedAdmin;