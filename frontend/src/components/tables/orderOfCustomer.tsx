import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import instance from "../../Api/axios";
import type { Order } from "../../types/orders";

interface OrdersProps {
  customerId: number | string;
}

export default function OrdersOfCustomer({ customerId }: OrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { authToken } = useAuth();

  async function fetchOrders() {
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
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError("Failed to retrieve customer's order data");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [authToken, customerId]);

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white mt-3 shadow-md rounded-md p-4 text-gray-500">
        Loading orders...
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white mt-3 shadow-md rounded-md p-4 text-red-600">
        {error}
      </div>
    );
  }

  // Empty State
  if (orders.length === 0) {
    return (
      <div className="bg-white mt-3 shadow-md rounded-md p-4 text-gray-500">
        No orders found
      </div>
    );
  }

  // ✅ Orders Table
  return (
    <div className="bg-white shadow-md rounded-md overflow-x-auto mt-3">
      <table className="min-w-full border-collapse">
        <thead className="bg-blue-100 text-left text-gray-700">
          <tr>
            <th className="py-3 px-4 font-semibold">Order ID</th>
            <th className="py-3 px-4 font-semibold">Date</th>
            <th className="py-3 px-4 font-semibold">Vehicle ID</th>
            <th className="py-3 px-4 font-semibold">Employee ID</th>
            <th className="py-3 px-4 font-semibold">Total Price</th>
            <th className="py-3 px-4 font-semibold">Est. Completion</th>
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold">Service</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o.order_id}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              <td className="py-3 px-4">{o.order_id}</td>
              <td className="py-3 px-4">
                {new Date(o.order_date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{o.vehicle_id}</td>
              <td className="py-3 px-4">{o.employee_id}</td>
              <td className="py-3 px-4">
                {o.OrderInfoDetail?.order_total_price
                  ? `$${o.OrderInfoDetail.order_total_price}`
                  : "—"}
              </td>
              <td className="py-3 px-4">
                {o.OrderInfoDetail?.order_estimated_completion_date
                  ? new Date(
                      o.OrderInfoDetail.order_estimated_completion_date
                    ).toLocaleDateString()
                  : "—"}
              </td>
              <td className="py-3 px-4">
                {o.OrderStatusDetail?.order_status || "—"}
              </td>
              <td className="py-3 px-4">
                {o.OrderServiceDetail?.CommonServiceOrder?.service_name ||
                  "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
