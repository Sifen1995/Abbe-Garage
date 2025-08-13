const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {
  Employee,
  EmployeePassword,
  EmployeeRole,
  CompanyRoles,
} = require("../models/index");

dotenv.config();

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const employee = await Employee.findOne({
      where: { employee_email: email },
      include: [
        {
          model: EmployeePassword,
          as: "PasswordDetail",
          attributes: ["employee_password_hashed"],
          required: true,
        },
        {
          model: EmployeeRole,
          as: "EmployeeRoleDetail",
          attributes: ["company_role_id"],
          required: true,
          include: {
            model: CompanyRoles,
            as: "CompanyRoleDetail",
            attributes: ["company_role_name"],
            required: true,
          },
        },
      ],
    });

    if (!employee) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials (email not found)" });
    }

    const hashedPassword = employee.PasswordDetail.employee_password_hashed;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials (incorrect password)" });
    }

    const employeeId = employee.employee_id;
    const companyRoleId = employee.EmployeeRoleDetail.company_role_id;

    const token = jwt.sign(
      {
        employeeId: employeeId,
        companyRoleId: companyRoleId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(StatusCodes.OK).json({
      msg: "User login successful",
      token: token,
      user: {
        id: employeeId,
        email: employee.employee_email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later." });
  }
}

async function checkUser(req, res) {
  const { employeeId: id, companyRoleId: role } = req.employee || {};

  if (!id || !role) {
    console.log("Missing values:", id, role);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Unauthenticated user" });
  }

  return res.status(StatusCodes.OK).json({ msg: "Valid user", id, role });
}


module.exports = { login, checkUser };
