const express=require("express")
const router=express.Router()
const employeeMedileware=require("../middleware/employee_auth.middelware")
const adminMiddelware=require("../middleware/admin_auth.middelware")

const{getOneVehicle,updateVehicleInfo,deleteVehicle,getAllVehicles}=require("../controllers/adminVehicle")

router.get("/:id",employeeMedileware,getOneVehicle)
router.get("",adminMiddelware,getAllVehicles)
router.put("/:id",adminMiddelware,updateVehicleInfo)
router.delete("/:id",adminMiddelware,deleteVehicle)


module.exports=router

