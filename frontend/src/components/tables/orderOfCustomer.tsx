import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import instance from '../../Api/axios';
import type { OrdersData } from '../../types/orders';


interface OrdersProps {
  customerId: number;
}

export default function OrderOfCustomer({customerId}:OrdersProps) {

  const [order,setOrder]=useState<OrdersData[]>([])
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { authToken } = useAuth();

  async function fetchOrder() {
     if (!authToken) {
      setError("Authentication token not found");
      setIsLoading(false);
      return;
    }
    try {
      const response = await instance.get(`/customers/${customerId}/orders`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setOrder(response.data.orders || []);
    } 
    catch (error) {
      console.error("Fetch order error:", error);
      setError("Failed to retrieve customer's order data");
      setOrder([]);
    }
    finally{
       setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchOrder()
  },[authToken,customerId])

  return (
    <div>
       
    </div>
  )
}
