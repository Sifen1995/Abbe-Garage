const db=require("../config/db.config")
const bycrpt=require("bcrypt")
const {StatusCodes}=require("http-status-codes")
const {jwt} =require("jsonwebtoken")
const { Employee } = require('../models/index');
const { EmployeeRole} = require('../models/index');
const { EmployeePassword}=require("../models/index")
const { EmployeeInfo}=require('../models/index')
const {CompanyRoles}=require("../models/index");
const { where } = require("sequelize");
const sequelize = require('../config/db.config');

async function addEmployee(req,res) {
    const {email,firstname,lastname,role,password,phonenumber}=req.body
    if (!email || !firstname || !lastname || !role || !password || !phonenumber) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"pleas provide all the requierd field"})
    }

    
    try {

        const existingEmployeeByEmail = await Employee.findOne({
            where: {
                employee_email: email 
            }
        });

        if (existingEmployeeByEmail) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'Employee with this email already exists.' });
        }
        const companyRole=await CompanyRoles.findOne({where:{company_role_name:role}})
        if (!companyRole) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: `Role '${role}' not found.` });
        }
        const roleNumber=companyRole.company_role_id

        const newEmployee=await Employee.create({employee_email:email})
        const Emplyeerole=await EmployeeRole.create({employee_id:newEmployee.employee_id,company_role_id:roleNumber})
        const Employeeinfo=await EmployeeInfo.create({ employee_id:newEmployee.employee_id,employee_first_name:firstname,employee_last_name:lastname,employee_phone: phonenumber,})

        //password hashing section 
        const salt=await bycrpt.genSalt(10)
        const hashedPassword=await bycrpt.hash(password,salt)
        
        const Employeepassword=await EmployeePassword.create({employee_id:newEmployee.employee_id,employee_password_hashed:hashedPassword})
        

        res.status(StatusCodes.CREATED).json({
            message: "Employee added successfully!",
            employeeDetails: newEmployee.toJSON(),
            roleAssigned: companyRole.company_role_name
        });
    } 
    catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
    }
}

async function geAllEmployee(req,res) {
     try {
        const allEmployee=await Employee.findAll({
  include: [
    {
      model: EmployeeInfo,
      as: "EmployeeInfoDetail",
      attributes: ['employee_first_name', 'employee_last_name']
    },
    {
      model: EmployeeRole,
      as:"EmployeeRoleDetail"
    }
  ]
})
 const formatedRes=addEmployee.map()
    res.status(200).json(res.status(200).json({
  message: "Employees fetched successfully",
  employees: allEmployee.map(emp => {
    return {
      id: emp.employee_id,
      fullName: `${emp.EmployeeInfoDetail.employee_first_name} ${emp.EmployeeInfoDetail.employee_last_name}`,
      email: emp.employee_email,
      role: emp.EmployeeRoleDetail.company_role_name, 
      status: emp.employee_active_status,
      createdAt: emp.createdAt
    };
  })
}));
    } catch (error) {
    console.error(error); 

      
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong on our server' });
}
}

async function updateEmployee(req, res) {
  const targeted_employee_id = req.params.id; // from URL
  const {
    email,
    firstname,
    lastname,
    phonenumber,
    status,
    password
  } = req.body;

  const t = await sequelize.transaction();

  try {
    // 1. Find employee with associations
    const employee = await Employee.findByPk(targeted_employee_id, {
      include: [
        { model: EmployeeInfo, as: "EmployeeInfoDetail" },
        { model: EmployeePassword, as: "PasswordDetail" }
      ],
      transaction: t
    });

    if (!employee) {
      await t.rollback();
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Update main Employee table
    if (email) employee.employee_email = email;
    if(status) employee.employee_active_status=status
    await employee.save({ transaction: t });

    // 3. Update EmployeeInfo
    if (employee.EmployeeInfoDetail) {
      if (firstname) employee.EmployeeInfoDetail.employee_first_name = firstname;
      if (lastname) employee.EmployeeInfoDetail.employee_last_name = lastname;
      if (phonenumber) employee.EmployeeInfoDetail.employee_phone = phonenumber;
      await employee.EmployeeInfoDetail.save({ transaction: t });
    }

    // 4. Update EmployeeRole
    
    // 5. Update EmployeePassword
    if (employee.PasswordDetail && password) {
      employee.PasswordDetail.password = password; // Hash this in real apps!
      await employee.PasswordDetail.save({ transaction: t });
    }

    // Commit changes
    await t.commit();

    return res.json({ message: "Employee updated successfully" });

  } catch (err) {
    await t.rollback();
    return res.status(500).json({ message: err.message });
  }
}

async function deleteEmployee(req,res) {
  const targetedEmployee=req.params.id 
  try {
    const employee=await Employee.findByPk(targetedEmployee)
    if (!employee) {
      res.status(StatusCodes.BAD_REQUEST).json({msg:"the user couldn't be found"})
    }
    await employee.destroy()
    console.log("employee deleted")
    res.status(StatusCodes.OK).json({msg:"employee deleted"})

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
  }
}









module.exports={addEmployee,geAllEmployee,updateEmployee,deleteEmployee}


