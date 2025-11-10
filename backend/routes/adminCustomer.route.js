const express=require("express")
const router=express.Router()

const{getAllCustomers,getOrderByCustomer,addCustomer,getOneCustomer,updateCustomer,deleteCustomer,getAllVehiclesForSingleUser,addVehicle}=require("../controllers/adminCoustomer")

router.get("",getAllCustomers)
router.get("/:id",getOneCustomer)
router.get("/:id/vehicle",getAllVehiclesForSingleUser)
router.post("",addCustomer)
router.post("/:id/vehicle",addVehicle)
router.put("/:id",updateCustomer)
router.delete("/:id",deleteCustomer)
router.get('/:customerId/orders',getOrderByCustomer)


module.exports=router

