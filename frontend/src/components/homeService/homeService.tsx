import React,{useState,useEffect, useCallback} from 'react'
import axios from '../../Api/axios'
import instance from '../../Api/axios';
import { isAxiosError } from 'axios'

export default function HomeService() {
 interface Service {
    _id: string; 
    name: string;
    description: string; 
 }
    const [service,setService]=useState<Service[]>([])
    const [err,setErr]=useState<string | null>()
    const [loading, setLoading] = useState<boolean>(true);

       



const fetchService=useCallback(async ()=>{
  try {
    setLoading(true)
    const result=await instance.get<Service[]>('/services?limit=6')

    if (result.data) {
      setService(result.data)
    }
    else{
      setErr('no service data recived')
    }
  } 
  catch (error) {
    console.log(error)
  }
  finally {
            setLoading(false); 
        }
},[])
   
useEffect(()=>{
 fetchService()
},[fetchService])

  return (
    <div className='flex flex-col p-6 h-full bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]'>
       {service.map((serviceItem)=>(
        <div key={serviceItem._id} className="service-card">
                    <p className="text-xl font-semibold text-gray-800 mb-2">Service and Repair</p>
                    <h3 className="text-gray-600 mb-4 flex-grow">{serviceItem.name}</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer">read more +</div>
                        
                    </div>
                </div>
       ))}
    </div>
  )
}

        