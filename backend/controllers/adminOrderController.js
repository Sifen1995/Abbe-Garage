const { Model } = require("sequelize");
const db=require("../config/db.config")
const sequelize = require('../config/db.config');
const{Orders,OrderStatus, OrderInfo, OrderService, CommonService, Employee, EmployeeInfo,Customer_identifier,Customer_info}=require("../models/index")
const {StatusCodes}=require("http-status-codes")



async function getAllOrders(req,res) {
    try {
        const orders = await Orders.findAll({
            include:[{
               
                model: OrderInfo, 
                as: 'OrderInfoDetail',
                attributes:["order_total_price", "order_estimated_completion_date", "order_completion_date", "order_additional_requests", "order_additional_requests_completed"]
            },
            
            {
                model: OrderStatus, 
                as: 'OrderStatusDetail',
                attributes: ['order_status']
            }
            ]
        });
        
       
        if (orders.length===0) {
            return res.status(StatusCodes.NOT_FOUND).json({msg:"no order found"});
        }

        const formatedOrder = orders.map(order => {
            
            // Get the associated OrderInfo data (can be null if not found)
            const orderInfo = order.OrderInfoDetail || {}; 
            // Get the associated OrderStatus data
            const orderStatus = order.OrderStatusDetail || {};
            
            return {
                id: order.order_id,
                owiningCustomer: order.customer_id,
                assignedEmployee: order.employee_id,
                vehicle: order.vehicle_id,
                date: order.order_date, 
                hash: order.order_hash,
                
               
                status: orderStatus.order_status,
                
               
                totalPrice: orderInfo.order_total_price,
                estimatedCompletionDate: orderInfo.order_estimated_completion_date,
                completionDate: orderInfo.order_completion_date,
                additonalRequests: orderInfo.order_additional_requests,
                additonalRequestsCompletionDate: orderInfo.order_additional_requests_completed
            }
        });

        
        return res.status(StatusCodes.OK).json({ orders: formatedOrder });
    } 
    catch (error) {
        console.error("Error in getAllOrders:", error); // Use console.error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong"}); 
    }
}


async function addOrder(req, res) {
    const {
        customer_id,
        employee_id,
        order_date,
        order_hash,
        vehicle_id,
        statusName, // This is the status we'll check/create
        order_total_price,
        order_estimated_completion_date,
        order_additional_requests,
        service_id,
        service_completed
    } = req.body;

    // 1. Input Validation Check
    if (!customer_id || !employee_id || !order_date || !order_hash || !vehicle_id || !order_total_price ||
        !order_estimated_completion_date ||
        !service_id || !service_completed) {
        // Assuming StatusCodes is imported/available
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Please provide all required information."
        });
    }

    const selectedStatus = statusName || 'Pending'; // Default to 'Pending' if not provided

    try {
        // 2. FIND or CREATE the OrderStatus
        // Use findOrCreate which checks if the record exists, and if not, creates it.
        const [orderStatus, created] = await OrderStatus.findOrCreate({
            where: {
                order_status: selectedStatus
            },
            defaults: {
                order_status: selectedStatus
            }
        });
        
        // Log if a new status was created (optional but helpful for debugging)
        if (created) {
            console.log(`New OrderStatus '${selectedStatus}' created.`);
        }

        const statusNumber = orderStatus.order_status_id;

        // 3. Check for existing Order
       const existinOrder=await Orders.findOne({
  where:{
vehicle_id:vehicle_id ,
 order_status_id:statusNumber
 }
})

        if (existinOrder) {
            // Fix: You were missing a dot (.) after statusCodes.CONFLICT
            return res.status(StatusCodes.CONFLICT).json({
                msg: "The order already exists."
            });
        }

        // 4. Create the new Order and related records
        const newOrder = await Orders.create({
            customer_id: customer_id,
            employee_id: employee_id,
            order_date: order_date,
            order_hash: order_hash,
            order_status_id: statusNumber,
            vehicle_id: vehicle_id
        });

        // Ensure you are passing order_id to the OrderService table if it needs it.
        // Assuming OrderService needs the order_id, which isn't in your original create call.
        // I will assume for now you ONLY need service_id and service_completed as per your original code.
        const orderInfo = await OrderInfo.create({
            order_id: newOrder.order_id,
            order_total_price: order_total_price,
            order_estimated_completion_date: order_estimated_completion_date,
            order_additional_requests: order_additional_requests
        });
        
        // Note: Your OrderService creation is missing newOrder.order_id, 
        // which is typically necessary for a join/bridge table. 
        // I'll keep it as is, but it might be a bug in your original schema/code.
        const orderService = await OrderService.create({
            order_id: newOrder.order_id,
            service_id: service_id,
            service_completed: service_completed
        });


        // 5. Successful Response
        return res.status(StatusCodes.CREATED).json({
            message: "Order created successfully!",
            orderDetails: newOrder.toJSON()
        });

    } catch (error) {
        console.error("Error in addOrder:", error); // Use console.error for errors
        // Assuming StatusCodes is imported/available
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Something went wrong."
        });
    }
}

async function getOneOrder(req, res) {
    // Note: It's good practice to destructure StatusCodes if it's external,
    // or assume it's globally available as in your original code.
    const targetedOrderId = req.params.id;

    try {
        const order = await Orders.findByPk(targetedOrderId, {
            // Use attributes to explicitly select columns for better performance
            attributes: ['order_id', 'customer_id', 'employee_id', 'order_hash', 'order_date', 'vehicle_id'], 
            include: [
                {
                    model: OrderInfo,
                    as: 'OrderInfoDetail',
                    // Only select necessary attributes from OrderInfo
                    attributes: ['order_total_price', 'order_estimated_completion_date', 'order_additional_requests'],
                },
                {
                    model: OrderService,
                    as: 'OrderServiceDetail',
                    attributes: ['service_completed'], 
                    include: [
                        {
                            model: CommonService,
                            as: 'CommonServiceOrder',
                            attributes: ['service_name'] // Only need the name
                        }
                    ]
                },
                {
                    model: OrderStatus,
                    as: 'OrderStatusDetail',
                    
                }
            ]
        });

        // 1. Check if the order was found
        if (!order) {
            // Note: findByPk returns a single object or null, no need to check order.length === 0
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Order not found" });
        }

        // 2. Extract and format data correctly (Handling Arrays)

        // Map the array of OrderServiceDetail to get an array of service objects
        const serviceDetail = order.OrderServiceDetail;
const servicesList = [{
  serviceName: serviceDetail.CommonServiceOrder.service_name,
  serviceCompleted: serviceDetail.service_completed
}];


        const employee=await Employee.findByPk(order.employee_id,{
            include:[
                {
                    model: EmployeeInfo,
                    as:'EmployeeInfoDetail'
                }
            ]
        })
        const mechanicFirstName=employee.EmployeeInfoDetail.employee_first_name 
        const mechanicLastName=employee.EmployeeInfoDetail.employee_last_name 

        const mechanicFullName=`${mechanicFirstName} ${mechanicLastName}`

        const customer=await Customer_identifier.findByPk(order.customer_id,{
            include:[
                {
                    model:Customer_info,
                    as:'CustomerInfoDetail'
                }
            ]
        })

        const customerFirstName=customer.CustomerInfoDetail.customer_first_name
        const customerLastName=customer.CustomerInfoDetail.customer_last_name

        const customerFullName=`${customerFirstName} ${customerLastName}`

        // Access nested properties for single relationships (OrderInfo and OrderStatus)
        const orderInfo = order.OrderInfoDetail;
        const statusName = order.OrderStatusDetail.order_status;
       
        console.log(statusName)
        // 3. Send the structured response
        return res.status(StatusCodes.OK).json({
            msg: "Order fetched successfully",
            order: {
                id: order.order_id,
                owningCustomer: customerFullName,
                assignedMechanick: mechanicFullName,
                orderHash: order.order_hash,
                orderDate: order.order_date,
                vehicleId: order.vehicle_id,
                statusname: statusName,
                // Accessing properties from OrderInfoDetail
                totalPrice: orderInfo ? orderInfo.order_total_price : null,
                orderEstimatedCompletionDate: orderInfo ? orderInfo.order_estimated_completion_date : null,
                orderAdditionalRequests: orderInfo ? orderInfo.order_additional_requests : null,
                // Services List (Correctly handled as an array)
                services: servicesList, 
            }
        });

    } catch (error) {
        console.error("Error in getOneOrder:", error); // Use console.error for errors
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

async function updateOrderInfo(req,res) {
    const {
        customer_id,
        employee_id,
        order_date,
        order_hash,
        vehicle_id,
        order_total_price,
        order_estimated_completion_date,
        order_additional_requests,
        service_id,
        service_completed,
        order_completion_date,
        order_additional_requests_completed
    } = req.body;
    const targetedOrderId=req.params.id 
    const t=await sequelize.transaction()
    try {
       const order=await Orders.findByPk(targetedOrderId,{
        include:[
            {
                model:OrderInfo,
                as:'OrderInfoDetail'
            },
        {
            model:OrderService,
            as:'OrderServiceDetail'
        }
        ],
        transaction:t
       }) 

       if (!order) {
        await t.rollback()
        return res.status(StatusCodes.NOT_FOUND).json({msg:'order not found'})
       }

       if (employee_id) order.employee_id = employee_id;
       if (customer_id) order.customer_id = customer_id;
       if (order_date) order.order_date = order_date;
       if (order_hash) order.order_hash = order_hash;
       if (vehicle_id) order.vehicle_id = vehicle_id;
       await order.save({ transaction: t });

       if (order_total_price) order.OrderInfoDetail.order_total_price = order_total_price;
       if (order_estimated_completion_date) order.OrderInfoDetail.order_estimated_completion_date = order_estimated_completion_date;
       if (order_completion_date) order.OrderInfoDetail.order_completion_date = order_completion_date;
       if (order_additional_requests) order.OrderInfoDetail.order_additional_requests = order_additional_requests;
       if (order_additional_requests_completed) order.OrderInfoDetail.order_additional_requests_completed = order_additional_requests_completed;
       await order.OrderInfoDetail.save({ transaction: t });

       if (service_id) order.OrderServiceDetail.service_id = service_id; 
       if (service_completed) order.OrderServiceDetail.service_completed= service_completed; 
        await order.OrderServiceDetail.save({ transaction: t });

         await t.commit();

    return res.json({ message: "order updated successfully" });
    } 
    catch (error) {
        console.log(error)
        await t.rollback()
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:"somehing went wrong" });
    }
}

async function deleteOrder(req,res) {
    const targetedOrderId=req.params.id 
    try {
       const order=await Orders.findByPk(targetedOrderId) 
       if (!order) {
         return res.status(StatusCodes.NOT_FOUND),json({msg:"the order can not be found "})
       }
       await order.destroy()
       return res.status(StatusCodes.ACCEPTED).json({msg:"order deleted successfully"})
    } 
    catch (error) {
         console.error(error); 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}


async function updateOrderStatus(req, res) {
  const targetedOrderId = req.params.id;
  const { orderStatus } = req.body;

  if (!orderStatus) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide the status" });
  }

  const t = await sequelize.transaction();

  try {
    // 1️⃣ Find the order
    const order = await Orders.findByPk(targetedOrderId, { transaction: t });

    if (!order) {
      await t.rollback();
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Order not found" });
    }

   const cleanStatus = orderStatus.trim();

const [statusRecord, created] = await OrderStatus.findOrCreate({
  where: { order_status: cleanStatus },
  defaults: { order_status: cleanStatus },
  transaction: t,
});

order.order_status_id = statusRecord.order_status_id;
await order.save({ transaction: t });


    // 4️⃣ Commit the transaction
    await t.commit();

    return res.json({
      message: "Order status updated successfully",
      newStatus: statusRecord. order_status,
    });
  } catch (error) {
    console.error(error);
    await t.rollback();
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}






async function getOrderStatus(req,res) {
     const targetedOrderId=req.params.id 
     try {
       const order=await Orders.findByPk(targetedOrderId,{
        include:[
            {
                model:OrderStatus,
                as:'OrderStatusDetail'
            }
        ],
      }) 
      const orderStatus=order.OrderStatusDetail.order_status
      console.log(orderStatus)
      return res.status(StatusCodes.OK).json({msg:'status feathed successfully',
        
        status:orderStatus
      })
      

     } 
     catch (error) {
        console.log(error)
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'something went wrong'})
     }
}

module.exports={getAllOrders,getOneOrder,getOrderStatus,addOrder,updateOrderInfo,updateOrderStatus,deleteOrder}
