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

sequelize.sync()
  .then(() => {
    console.log("✅ All tables synced");
    seedAdmin(); // now safe to run
  })
  .catch((err) => console.error("❌ Sync error:", err));


server.listen(port,async(err)=>{
    if (err) {
        console.log(err)
    }
    else{
     await seedAdmin()   
     console.log(`listining on port ${port}`)
    }
})