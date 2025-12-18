import React, { useEffect, useState } from 'react';
import type { OrderListItem } from '../../types/orders';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import instance from '../../Api/axios';



function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const [firstName, ...rest] = fullName.trim().split(" ");
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

const Edit = () => (
  <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base">
    <EditIcon />
  </span>
);

const ViewAction = () => (
  <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base ml-2">
    <VisibilityIcon />
  </span>
);



const OrderTable: React.FC = () => {

const [orders,setOrders]=useState<OrderListItem[]>([])
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const {authToken}=useAuth()
const headers = ["ID", "Customer Name", "Mechanic Name", "Vehicle ID", "Status", "Total Price",'service Name'];



async function fetchCustomers() {
     if (!authToken) {
            setError("Authentication token not found.");
            setIsLoading(false);
            return;
        }

   try {     
     setIsLoading(true); 
     setError(null);

     const response=await instance.get('/orders',{
       headers: {
                    
                    'Authorization': `Bearer ${authToken}` 
                }
     })
     console.log(response.data.orders)
     setOrders(response.data.orders);

   } 
   catch (error) {
     console.error("Fetch Orders Error:", error);
            setError("Failed to retrieve orders list."); 
            setOrders([]);
   }

   finally {
           
            setIsLoading(false); 
        }
}

useEffect(()=>{
   fetchCustomers()
},[authToken])

  return (
    <div className=" bg-white rounded-lg shadow-xl overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-blue-900 text-white text-sm font-semibold tracking-wider uppercase">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-3 px-4 text-left whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {orders.map((order, index) => (        

           
              <tr
                key={order.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
              >
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{order.id}</td>
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{order.owiningCustomer}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{order.assignedEmployee}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{order.vehicle}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{order.status}</td>
                <td className="py-3 px-4 text-sm font-semibold text-green-600">{order.totalPrice}</td>
                

                {/* Action Icons */}
                <td className="py-3 px-4 text-sm whitespace-nowrap">
                  <div className="flex items-center">
                    <Link to={`edit/${order.id}`}><Edit /></Link>
                   <Link to={`view/${order.id}`}> <ViewAction /></Link>
                  </div>
                </td>
              </tr>
            )
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
