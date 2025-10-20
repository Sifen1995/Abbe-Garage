const express=require("express")
const router=express.Router()
const employeeMedileware=require("../middleware/employee_auth.middelware")
const adminMiddelware=require("../middleware/admin_auth.middelware")

const{getAllService,getOneServiceDetail,deleteService,updateServiceDetail,addService}=require("../controllers/adminServiceController")

router.get("/:id",employeeMedileware,getOneServiceDetail)
router.get("",employeeMedileware,getAllService)
router.put("/:id",adminMiddelware,updateServiceDetail)
router.delete("/:id",adminMiddelware,deleteService)
router.post("",adminMiddelware,addService)


module.exports=router

