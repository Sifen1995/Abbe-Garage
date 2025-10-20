const db=require("../config/db.config")
const sequelize = require('../config/db.config');
const bcrypt=require("bcrypt")
const{Customer_identifier,Customer_info,Vehicle}=require("../models/index")
const {StatusCodes}=require("http-status-codes")

async function getAllCustomers(req, res) {
  try {
    const customers = await Customer_identifier.findAll({
      include: [
        {
          model: Customer_info,
          as: "CustomerInfoDetail",
        }
      ]
    });

      if (customers.length===0) {
         return res.status(StatusCodes.BAD_REQUEST).json({msg:"no customers avilabel"})
       }
    const formatedCustomer = customers.map(customer => {
      const fullName = `${customer.CustomerInfoDetail.customer_first_name} ${customer.CustomerInfoDetail.customer_last_name}`;

      return {
        id: customer.customer_id,
        fullName: fullName,
        email: customer.customer_email,
        status: customer.customer_active_status,
        createdAt: customer.customer_added_date
      }
    });

    return res.status(StatusCodes.OK).json({
      msg: "customers fetched successfully",
      customers: formatedCustomer
    });

  } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong" })
  }
}


async function addCustomer(req,res) {
    const {email,firstname,lastname,phonenumber,status}=req.body 
    if (!email || !firstname || !lastname || !phonenumber || !status) {
        
       return res.status(StatusCodes.BAD_REQUEST).json({msg:'pleas fill all the required fields'}) 
       
    }

    try {
        const existingCustomer=await Customer_identifier.findOne({
            where:{
             customer_email:email
            }
        })
        if (existingCustomer) {
            return res.status(StatusCodes.CONFLICT).json({msg:'the email already exists'})
        }

        const newCustomer=await Customer_identifier.create({customer_email:email, customer_phone_number:phonenumber})
        await Customer_info.create({customer_first_name:firstname, customer_last_name:lastname, customer_active_status:status,customer_id: newCustomer.customer_id})


        return res.status(StatusCodes.CREATED).json({
        msg: "Customer created successfully",
        customer: newCustomer
  });
    } 
    
    catch (error) {
         console.error("Add customer error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error", error: error.message });
    }
}

async function getOneCustomer(req,res){
   const targeted_customer_id=req.params.id 
   
   try {
    const targeted_customer=await Customer_identifier.findOne({
    where:{customer_id:targeted_customer_id},
    include:[
                {
                    model:Customer_info,
                    as:"CustomerInfoDetail",
                }
            ]
   })
   if (!targeted_customer) {
     return res.status(StatusCodes.BAD_REQUEST).json({msg:"the customer doesnot exixst"})
   }
   const customerInfo = targeted_customer.CustomerInfoDetail;
        const fullName = customerInfo
            ? `${customerInfo.customer_first_name} ${customerInfo.customer_last_name}`
            : null;

    return res.status(StatusCodes.OK).json({
            msg: "Customer fetched successfully",
            customer: {
                id: targeted_customer.customer_id,
                email: targeted_customer.customer_email,
                phone: targeted_customer.customer_phone_number,
                fullName,
                status: customerInfo ? customerInfo.customer_active_status : null
            }
        });

   } catch (error) {
      console.error("Get customer error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Server error",
            error: error.message
        });
   }
}

async function updateCustomer(req,res) {
    const targeted_customer_id=req.params.id 
    const {
    email,
    firstname,
    lastname,
    phonenumber,
    status
      } = req.body;

  const t = await sequelize.transaction();
  try {
     const customer=await Customer_identifier.findByPk(targeted_customer_id,{
        include:[
          {model:Customer_info, as:"CustomerInfoDetail"}  
        ],
        transaction: t
     })
  
     if (!customer) {
        await t.rollback()
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"customer is not found "})
     }

     if (email) customer. customer_email=email
     if(phonenumber) customer.customer_phone_number=phonenumber 
     await customer.save({transaction:t}) 
     if(firstname) customer.CustomerInfoDetail.customer_first_name=firstname
     if(lastname) customer.CustomerInfoDetail.customer_last_name=lastname
     if(status) customer.CustomerInfoDetail.customer_active_statuse=status
     await customer.CustomerInfoDetail.save({transaction:t})

     await t.commit();

    return res.json({ message: "Customer updated successfully" });
     
  } 
  catch (error) {
     await t.rollback();
    return res.status(500).json({ msg:"somehing went wrong" });
  }
}

async function deleteCustomer(req,res) {
    const targeted_customer=req.params.id 
   

    try {
        const customer=await Customer_identifier.findByPk(targeted_customer)
    if (!customer) {
      res.status(StatusCodes.NOT_FOUND).json({msg:"the customer couldn't be found"})
    }
    await customer.destroy()
    console.log("customer deleted")
    res.status(StatusCodes.OK).json({msg:"customer deleted"})
    }
     catch (error) {
       console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"}) 
    }
}



async function getAllVehiclesForSingleUser(req, res) {
  const targetedCustomerId = req.params.id;

  try {
    
    const vehicles = await Vehicle.findAll({
      where: { customer_id: targetedCustomerId },
    });

    if (!vehicles || vehicles.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No vehicles found for this customer" });
    }

    
    return res.status(StatusCodes.OK).json({
      msg: "Vehicles fetched successfully",
      vehicles: vehicles.map((vehicle) => ({
        id: vehicle.vehicle_id,
        vehicleYear: vehicle.vehicle_year,
        vehicleMake: vehicle.vehicle_make,
        vehicleModel: vehicle.vehicle_model,
        vehicleType: vehicle.vehicle_type,
        vehicleMileage: vehicle.vehicle_mileage,
        vehicleTag: vehicle.vehicle_tag,
        vehicleSerialNumber: vehicle.vehicle_serial_number,
        vehicleColor: vehicle.vehicle_color,
        
      })),
    });
  } catch (error) {
    console.log("Error fetching vehicles:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}




async function addVehicle(req,res) {
    const {vehicleYear,vehicleMake,vehicleModel,vehicleType,vehicleMileage,vehicleTag,vehicleSerialNumber,vehicleColor	
} =req.body 
  const customerId=req.params.id

  if (!vehicleYear||!vehicleMake||!vehicleModel||!vehicleType||!vehicleMileage||!vehicleTag	||!vehicleSerialNumber||!vehicleColor	
) {
   console.log("Request body:", req.body);

    return res.status(StatusCodes.BAD_REQUEST).json({msg:"pleas provide all information"})
  }
  
  try {
     const existingVehicle=await Vehicle.findOne({
      where:{
        vehicle_serial_number:vehicleSerialNumber
      }
     })

     if (existingVehicle) {
       return res.status(StatusCodes.CONFLICT).json({msg:"the vehicle already exsists"})
     }

     const newVehicle=await Vehicle.create({customer_id:customerId,
      vehicle_year:vehicleYear,
      vehicle_make:vehicleMake,	
      vehicle_model	:vehicleModel,
      vehicle_type:vehicleType,	
      vehicle_mileage	:vehicleMileage,
      vehicle_tag	:vehicleTag,
      vehicle_serial_number	:vehicleSerialNumber,
      vehicle_color:vehicleColor
    })

    return res.status(StatusCodes.CREATED).json({msg:"vehicle added successfully",vehicle:newVehicle})
  } 
  catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"})
  }
}
module.exports={getAllCustomers,addCustomer,getOneCustomer,updateCustomer,deleteCustomer,getAllVehiclesForSingleUser,addVehicle}