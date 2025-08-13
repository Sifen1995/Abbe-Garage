const express=require("express")
const router=express.Router()

const{getAllCustomers}=require("../controllers/adminCoustomer")

router.get("",getAllCustomers)

module.exports=router

