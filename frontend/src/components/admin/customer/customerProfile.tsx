
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import type { Customer } from "../../../types/customer";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import instance from "../../../Api/axios";
import VehiclesOfCustomer from "../../tables/vehiclesOfCustomer";

export default function CustomerProfile() {

 const [customer,setCustomer]=useState<Customer |null>()
   const [error,setError]=useState<any | null>()
   const [isLoading,setIsLoading]=useState<boolean>(true)
   const {authToken}=useAuth()
   const {id}=useParams()

   async function fetchCustomer() {
    if (!authToken) {
        setError('Authentication token not found')
        setIsLoading(false)
        return
    }
   

    try {
        const response=await instance.get(`/customers/${id}`,{
            headers: {
                    
                    'Authorization': `Bearer ${authToken}` 
                }
        })
        setCustomer(response.data.customer)
    } 
    catch (error) {
         console.error("Fetch Customer Error:", error);
            setError("Failed to retrieve customer data"); 
            setCustomer(null);
    }
    finally{
        setIsLoading(false); 
    }
   }

   useEffect(()=>{
   fetchCustomer()
   },[authToken])


  return (
    <div className="flex bg-gray-50 min-h-screen p-10">
      {/* Left Side Navigation Circles */}
      <div className="flex flex-col items-center mr-10 relative">
        {/* Vertical line */}
        <div className="absolute top-10 bottom-10 w-[2px] bg-gray-300 left-1/2 transform -translate-x-1/2 z-0"></div>

        {/* Info */}
        <div className="z-10 mb-12">
          <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full font-semibold shadow-lg">
            Info
          </div>
        </div>

        {/* Cars */}
        <div className="z-10 mb-12">
          <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full font-semibold shadow-lg">
            Cars
          </div>
        </div>

        {/* Orders */}
        <div className="z-10">
          <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full font-semibold shadow-lg">
            Orders
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 space-y-10">
        {/* Customer Info */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900">
           Customer:{customer?.fullName}
          </h2>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Email:</span>{" "}
            {customer?.email} <br />
            <span className="font-semibold">Phone number:</span> {customer?.phoneNumber} <br />
            <span className="font-semibold">Active Status:</span> {customer?.status} <br />
            <span className="font-semibold">Edit customer info:</span>{" "}
            <EditIcon className="inline text-red-600 cursor-pointer" />
          </p>
        </div>

        {/* Vehicles Section */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900">
            Vehicles of {customer?.fullName}
          </h3>
          {
            customer?.id ?(<VehiclesOfCustomer customerId={customer.id}/>):(
               <div className="bg-white mt-3 shadow-md rounded-md p-4 text-gray-500">
                No vehicle found
              </div>
            )
          }
         
          <button className="mt-4 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition">
            ADD NEW VEHICLE
          </button>
        </div>

        {/* Orders Section */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900">
            Orders of {customer?.fullName}
          </h3>
          <p className="text-gray-500 mt-2">Orders will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
