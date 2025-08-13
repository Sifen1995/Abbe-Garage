const express=require("express")
const router=express.Router()
const adminMiddelware=require("../middleware/admin_auth.middelware")

const {login,checkUser}=require("../controllers/auth.controller")



router.post("/login",login)
router.get("/check", adminMiddelware, checkUser);


module.exports=router