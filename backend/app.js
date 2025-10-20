const express=require("express")
const cors=require("cors")
const dotenv = require('dotenv');
const dbConnection = require("./config/db.config");
const seedAdmin=require("./seeders/seedAdmin")
const port=process.env.PORT


const server=express()
server.use(cors())

server.get("",(req,res)=>{
    res.end("i am working")
})
const sequelize = require('./config/db.config');
const { Employee } = require('./models');



sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");
    seedAdmin();
  })
  .catch((err) => console.error("❌ DB connection error:", err));


//section for auth routeing
const auth_route=require("./routes/auth.routes")
server.use(express.json())

server.use("/api/user",auth_route)

//section for adminEmployee routeing

const admin_route=require("./routes/adminEmployee.route")
const adminMiddelware=require("./middleware/admin_auth.middelware")
server.use(express.json())

server.use("/api/employees",adminMiddelware,admin_route)

//section for adminCustomer routeing

const admin_customer_route=require("./routes/adminCustomer.route")
server.use(express.json())

server.use("/api/customers",adminMiddelware,admin_customer_route)

//section for vehicle routeing
const vehicle_route=require('./routes/adminVehicle')
server.use(express.json())

server.use("/api/vehicle",vehicle_route)


//section for common service routeing
const service_route=require('./routes/adminService')
server.use(express.json())

server.use("/api/services",service_route)

//section for order routeing
const order_route=require('./routes/adminOrder')
server.use(express.json())

server.use("/api/orders",order_route)


const customerPortalRoutes = require('./routes/customerPortal');
server.use(express.json())
server.use('/api/public', customerPortalRoutes);





server.listen(port,async(err)=>{
    if (err) {
        console.log(err)
    }
    else{
     await seedAdmin()   
     console.log(`listining on port ${port}`)
    }
})