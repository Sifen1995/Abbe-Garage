import React, { useState } from 'react'
import type { Serivce } from '../../../types/service'
import { useAuth } from '../../context/AuthContext'
import instance from '../../../Api/axios'

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

           setService(response.data.servicese)
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
    
  return (
    <div className='ml-10 mr-10 mt-6'>
        <div>
            <p className='text-[42px] font-bold text-blue-900 mb-5'>Service We Provide</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora animi placeat ducimus deserunt obcaecati incidunt id officiis nulla, quam quaerat et cumque itaque explicabo unde iure ut voluptatem? Obcaecati, aspernatur!</p>
        </div>

       <div>
        
       </div>

        <div></div>
    </div>
  )
}
