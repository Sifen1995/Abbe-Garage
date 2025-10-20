const db=require("../config/db.config")
const bycrpt=require("bcrypt")
const {StatusCodes}=require("http-status-codes")
const sequelize = require('../config/db.config');
const { Orders, Customer_identifier, OrderStatus, OrderService, CommonService } = require('../models');


async function getPublicOrderStatus(req,res) {
    try {
         const {orderId,email}=req.query
         
         if (!orderId||!email) {
            return res.status(400).json({ message: 'Please provide both orderId and email' });
         }
         const user= await Customer_identifier.findOne({
            where:{
                customer_email:email.toLowerCase()
            }
         })
         const order=await Orders.findByPk(orderId,{
            include:[
                {
                    model:OrderService,
                    as:'OrderServiceDetail',
                    include:[
                      {
                          model:CommonService,
                          as:'CommonServiceOrder'
                      }
                    ]
                },
                {
                    model:OrderStatus,
                    as:'OrderStatusDetail'
                }
            ]
         })

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({msg:"customer with the provided email doesn't exist "})
        }
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({msg:"order with the provided id doesn't exist "}) 
        }
       
        const serviceDetail = order.OrderServiceDetail;
const servicesList = [{
  serviceName: serviceDetail.CommonServiceOrder.service_name,
  serviceCompleted: serviceDetail.service_completed
}];



return res.status(StatusCodes.OK).json({
      message: 'Order fetched successfully',
      orderId: order.order_id,
      status: order.OrderStatusDetail?.order_status || 'Unknown',
      servicesList,
      
    });
    } 
    catch (error) {
          console.log(error)
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'something went wrong'})
    }
   
}
module.exports={getPublicOrderStatus}