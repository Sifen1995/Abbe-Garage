const express=require("express")
const router=express.Router()

const {addEmployee,geAllEmployee,updateEmployee,deleteEmployee}=require("../controllers/adminEmployee.controller")


router.post("",addEmployee)
router.get("",geAllEmployee)
router.put("/:id",updateEmployee)
router.delete("/:id",deleteEmployee)







module.exports=router