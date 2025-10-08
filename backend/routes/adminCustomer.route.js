const express=require("express")
const router=express.Router()

const{getAllCustomers,addCustomer,getOneCustomer,updateCustomer,deleteCustomer,getAllVehiclesForSingleUser,addVehicle}=require("../controllers/adminCoustomer")

router.get("",getAllCustomers)
router.get("/:id",getOneCustomer)
router.get("/:id/vehicle",getAllVehiclesForSingleUser)
router.post("",addCustomer)
router.post("/:id/vehicle",addVehicle)
router.put("/:id",updateCustomer)
router.delete("/:id",deleteCustomer)


module.exports=router

