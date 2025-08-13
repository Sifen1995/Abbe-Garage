const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);



    if (payload.companyRoleId !== 1) { // Checks if the role ID is not 1 (the admin role)
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Access Forbidden: Insufficient privileges" });
    }
    
    
    req.employee = {
      employeeId: payload.employeeId,
      companyRoleId: payload.companyRoleId,
    };
    next();
  } catch (error) {
    console.log("JWT Verify Error:", error.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid" });
  }
}

module.exports = adminAuthMiddleware;
