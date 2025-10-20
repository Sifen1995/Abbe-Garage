const db=require("../config/db.config")
const sequelize = require('../config/db.config');
const bcrypt=require("bcrypt")
const {CommonService}=require("../models/index")
const {StatusCodes}=require("http-status-codes");
const { Transaction } = require("sequelize");


async function getAllService(req,res) {
    try {
       const services=await CommonService.findAll() 
       if (services.length===0) {
         return res.status(StatusCodes.NOT_FOUND).json({msg:"no service avilabel"})
       }
       const formattedService=services.map(service=>{
        return{
           id:service.service_id ,
           name:service.service_name,
           description:service.service_description
        }
       })

       return res.status(StatusCodes.OK).json({msg:"service fetched successfully",
        service:formattedService
       })
    } 
    catch (error) {
         console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
    }
}

async function addService(req,res) {
    const {name,descreption}=req.body
    if (!name || !descreption) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"pleas provide all required information"})
    }

    try {
       const existingService=await CommonService.findOne({
        where:{
           service_name:name 
        }
       }) 

       if (existingService) {
         return res.status(StatusCodes.CONFLICT).json({msg:"the service already exists"})
       }
       const newService=await CommonService.create({service_name:name,service_description:descreption}) 

       return res.status(StatusCodes.CREATED).json({msg:"service added successfully",
        service:newService
       })
    } 
    catch (error) {
       console.log(error)
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
    }
}

async function updateServiceDetail(req,res) {
    const targetedServiceId=req.params.id 
     const {name,descreption}=req.body
    const t=await sequelize.transaction()
    try {
        const targetedService=await CommonService.findByPk(targetedServiceId,{transaction:t})
        if (!targetedService) {
            await t.rollback()
            return res.status(StatusCodes.NOT_FOUND).json({msg:"the service can not be found"})
        }

        if(name) targetedService.service_name=name
        if(descreption) targetedService.service_description=descreption
        await targetedService.save({transaction:t})
        await t.commit()

        return res.status(StatusCodes.OK).json({msg:"service detail updated successfully"})

    } 
    catch (error) {
      console.log(error)  
      await t.rollback();
      return res.status(500).json({ msg:"somehing went wrong" }); 
    }
}

async function getOneServiceDetail(req,res) {
    const targetedServiceId=req.params.id 
    try {
       const service=await CommonService.findByPk(targetedServiceId) 
       if (!service) {
         return res.status(StatusCodes.NOT_FOUND).json({msg:"service not found"})
       }

       return res.status(StatusCodes.OK).json({msg:"service fetched successfully",
        id:service.service_id,
        name:service.service_name,
        description:service.service_description
       })
    } 
    catch (error) {
       console.log(error)        
      return res.status(500).json({ msg:"somehing went wrong" }); 
    }
}

async function deleteService(req,res) {
    const targetedServiceId=req.params.id 
    try {
         const targetedService=await CommonService.findByPk(targetedServiceId) 
       if (!targetedService) {
         return res.status(StatusCodes.NOT_FOUND).json({msg:"service not found"})
       }

       await targetedService.destroy()
       return res.status(StatusCodes.ACCEPTED).json({msg:"service deleted successfully"})
    } 
    catch (error) {
         console.log(error)        
      return res.status(500).json({ mesg: "somehing went wrong" }); 
    }
}


module.exports={getAllService,getOneServiceDetail,updateServiceDetail,addService,deleteService}