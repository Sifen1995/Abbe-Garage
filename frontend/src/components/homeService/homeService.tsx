import React,{useState,useEffect} from 'react'
import axios from '../../Api/axios'

export default function homeService() {

    const [service,setService]=useState()
    const [err,setErr]=useState()

useEffect(()=>{
   const response=axios.get('http://localhost:4500/api/services')
   
},[])
  return (
    <div>
       <div>
         <p>title</p>
         <h3>description</h3>
         <div>
            <div>read more +</div>
            <div>icon</div>
         </div>
       </div>
    </div>
  )
}
