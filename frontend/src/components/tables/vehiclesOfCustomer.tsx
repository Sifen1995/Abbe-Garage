import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import type { Vehicle } from '../../types/vehicle'
import instance from '../../Api/axios'

interface VehiclesProps {
  customerId: string | number;
}


export default function VehiclesOfCustomer({ customerId }: VehiclesProps) {

   const [vehicle,setVehicle]=useState<Vehicle[]>([])
   const [error,setError]=useState<any | null>()
   const [isLoadin,setIsLoading]=useState<boolean>(true)
   const {authToken}=useAuth()

   async function fetchVehicle() {
     if (!authToken) {
       setError("Authentication token not found")
       setIsLoading(false)
     }

     try {
       const response=await instance.get(`customers/ ${customerId} /vehicle`,{
          headers: {
                    
                    'Authorization': `Bearer ${authToken}` 
                }
       })
       setVehicle(response.data.vehicles)
     } 
     catch (error) {
       console.error("Fetch vehicle Error:", error);
            setError("Failed to retrieve customers vehicle data"); 
            setVehicle([]);
     }
     finally{
      setIsLoading(false); 
     }
   }

  return (
    <div>
      
    </div>
  )
}
