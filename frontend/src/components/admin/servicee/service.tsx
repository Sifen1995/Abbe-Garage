import React, { useEffect, useState } from 'react'
import type { Serivce } from '../../../types/service'
import { useAuth } from '../../context/AuthContext'
import instance from '../../../Api/axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddService from './addService';



const Edit = () => (
  <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base">
    <EditIcon />
  </span>
);

const Delete = () => (
  <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base ml-2">
    <DeleteIcon />
  </span>
);

export default function Service() {

    const [services,setService]=useState<Serivce[]>([])
    const [error,setError]=useState<string | null>(null)
    const [isLoading,setIsLoading]=useState<boolean>(true)
    const {authToken}=useAuth()

    async function fetchServices() {
        if (!authToken) {
            setError("Authentication token not found.");
            setIsLoading(false);
            return; 
        }

        try {
           const response=await instance.get('/services',{
             headers: {
                    
                    'Authorization': `Bearer ${authToken}` 
                }
           }) 

           setService(response.data.service)
        } 
        catch (error) {
            console.error("Fetch service Error:", error);
            setError("Failed to retrieve service list."); 
            setService([]);
        }
        finally{
            setIsLoading(false); 
        }
    }

    useEffect(()=>{
      fetchServices()
    },[authToken])
    
  return (
    <div className='ml-10 mr-10 mt-6'>
        <div>
            <p className='text-[42px] font-bold text-blue-900 mb-5'>Service We Provide</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora animi placeat ducimus deserunt obcaecati incidunt id officiis nulla, quam quaerat et cumque itaque explicabo unde iure ut voluptatem? Obcaecati, aspernatur!</p>
        </div>

       <div>
         {services.map((service,index)=>(
            
            <div 
            // Alternating gray background (optional, based on common table design)
            className={`flex justify-between items-center py-5 border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } transition-colors duration-200 px-4`}  key={service.id}
        >
           
            {/* Left Section: Title and Description */}
            <div className="flex-1 pr-6" >
                
                <h3 className="text-xl font-bold text-[#002060] mb-1">
                    {service.name}
                </h3>
                <p className="text-sm text-gray-700 max-w-3xl">
                    {service.description}
                </p>
            </div>

            {/* Right Section: Action Icons */}
            <div className="flex items-center space-x-3 flex-shrink-0">
                {/* Red Edit Icon */}
                <Edit /> 
                
                {/* Black Delete Icon */}
                <Delete /> 
            </div>
        </div>
         ))}
       </div>

        <div>
            <AddService/>
        </div>
    </div>
  )
}
