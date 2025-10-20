const express=require("express")
const router=express.Router()
const employeeMedileware=require("../middleware/employee_auth.middelware")
const adminMiddelware=require("../middleware/admin_auth.middelware")

const {getAllOrders,getOneOrder,getOrderStatus,addOrder,updateOrderStatus,updateOrderInfo,deleteOrder}=require("../controllers/adminOrderController")


router.get("",adminMiddelware,getAllOrders)
router.get("/:id",employeeMedileware,getOneOrder)
router.get("/status/:id",employeeMedileware,getOrderStatus)
router.post("",adminMiddelware,addOrder)
router.put("/:id",employeeMedileware,updateOrderInfo)
router.put("/status/:id",employeeMedileware,updateOrderStatus)
router.delete("/:id",adminMiddelware,deleteOrder)

module.exports=router