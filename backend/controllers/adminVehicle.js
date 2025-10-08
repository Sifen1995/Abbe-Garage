const db=require("../config/db.config")
const sequelize = require('../config/db.config');
const bcrypt=require("bcrypt")
const {Customer_identifier,Vehicle}=require("../models/index")
const {StatusCodes}=require("http-status-codes");
const { Transaction } = require("sequelize");


async function getOneVehicle(req,res) {
    const targetedVehicleId=req.params.id
    try {
       const vehicle=await Vehicle.findByPk(targetedVehicleId)
       

       if (!vehicle) {
         return res.status(StatusCodes.CONFLICT).json({msg:"the specified vehicle does not exist"})
       }

       return res.status(StatusCodes.OK).json({msg:"vehicle fetched successfully",
        id: vehicle.vehicle_id,
        vehicleYear: vehicle.vehicle_year,
        vehicleMake: vehicle.vehicle_make,
        vehicleModel: vehicle.vehicle_model,
        vehicleType: vehicle.vehicle_type,
        vehicleMileage: vehicle.vehicle_mileage,
        vehicleTag: vehicle.vehicle_tag,
        vehicleSerialNumber: vehicle.vehicle_serial_number,
        vehicleColor: vehicle.vehicle_color,
        owningCustomer: vehicle.customer_id,
       })
    } 
    catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
    }
}


async function updateVehicleInfo(req,res) {
   const targetedVehicleId=req.params.id 
    const {vehicleYear,vehicleMake,vehicleModel,vehicleType,vehicleMileage,vehicleTag,vehicleSerialNumber,vehicleColor	
} =req.body 

const t=await sequelize.transaction()

try {
   const targetedVehicle=await Vehicle.findByPk(targetedVehicleId,{transaction:t}) 
   if (!targetedVehicle) {
    await t.rollback()
    return res.status(StatusCodes.NOT_FOUND).json({msg:"the vehicle can not be found"})
   }

   if(vehicleYear) targetedVehicle. vehicle_year=vehicleYear
   if(vehicleMake) targetedVehicle. vehicle_make=vehicleMake
   if(vehicleModel) targetedVehicle. vehicle_model=vehicleModel
   if(vehicleType) targetedVehicle. vehicle_type=vehicleType
   if(vehicleMileage) targetedVehicle. vehicle_mileage=vehicleMileage
   if(vehicleTag) targetedVehicle. vehicle_tag=vehicleTag
   if(vehicleSerialNumber) targetedVehicle. vehicle_serial_number=vehicleSerialNumber
   if(vehicleColor) targetedVehicle. vehicle_color=vehicleColor
 
   await targetedVehicle.save({ transaction: t });
   await t.commit()
   return res.status(StatusCodes.OK).json({msg:"vehicle updated successfuly"})

} 
catch (error) {
    await t.rollback()
    console.log(error)
    return res.status(500).json({ message: err.message }); 
}
}

async function deleteVehicle(req,res) {
     const targetedVehicleId=req.params.id 
     try {
       const targetedVehicle=await Vehicle.findByPk(targetedVehicleId)
       if (!targetedVehicle) {
         return res.status(StatusCodes.NOT_FOUND).json({msg:"the vehicle can not be found"})
       }
     
       await targetedVehicle.destroy()
       return res.status(StatusCodes.OK).json({msg:"vehcle deleted successfully"})

     } 
     
     catch (error) {
      console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"}) 
     }
}

async function getAllVehicles(req,res) {
   try {
      const vehicles=await Vehicle.findAll()
      const formattedVehicle=vehicles.map(vehicle=>{
        return {
        id: vehicle.vehicle_id,
        vehicleYear: vehicle.vehicle_year,
        vehicleMake: vehicle.vehicle_make,
        vehicleModel: vehicle.vehicle_model,
        vehicleType: vehicle.vehicle_type,
        vehicleMileage: vehicle.vehicle_mileage,
        vehicleTag: vehicle.vehicle_tag,
        vehicleSerialNumber: vehicle.vehicle_serial_number,
        vehicleColor: vehicle.vehicle_color,
        owningCustomer: vehicle.customer_id,
        }
      })

      return res.status(StatusCodes.OK).json({msg:"vehicles fetched successfully",
        vehicles:formattedVehicle
      })
   } 
   catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
   }
}


module.exports={getOneVehicle,updateVehicleInfo,deleteVehicle,getAllVehicles}
