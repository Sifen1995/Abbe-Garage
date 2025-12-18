import React, { useEffect, useState } from 'react';
import type { Customer } from '../../types/customer';
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



const CustomerTable: React.FC = () => {

const [customers,setCustomers]=useState<Customer[]>([])
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const {authToken}=useAuth()
const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Added Date", "Active", "Actions"];



async function fetchCustomers() {
     if (!authToken) {
            setError("Authentication token not found.");
            setIsLoading(false);
            return;
        }

   try {     
     setIsLoading(true); 
     setError(null);

     const response=await instance.get('/customers',{
       headers: {
                    
                    'Authorization': `Bearer ${authToken}` 
                }
     })

     setCustomers(response.data.customers);

   } 
   catch (error) {
     console.error("Fetch Customers Error:", error);
            setError("Failed to retrieve customer list."); 
            setCustomers([]);
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
          {customers.map((customer, index) => {
            const { firstName, lastName } = splitFullName(customer.fullName);

            return (
              <tr
                key={customer.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
              >
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{customer.id}</td>
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{firstName}</td>
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{lastName}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{customer.email}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{customer.phoneNumber}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{customer.createdAt}</td>
                <td className="py-3 px-4 text-sm font-semibold text-green-600">{customer.status}</td>

                {/* Action Icons */}
                <td className="py-3 px-4 text-sm whitespace-nowrap">
                  <div className="flex items-center">
                    <Link to={`updatecustomer/${customer.id}`}><Edit /></Link>
                   <Link to={`profile/${customer.id}`}> <ViewAction /></Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
