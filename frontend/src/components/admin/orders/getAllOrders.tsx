import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import instance from '../../../Api/axios';
import type { Order } from '../../../types/orders';
import type { Customer } from '../../../types/customer';
import type { Vehicle } from '../../../types/vehicle';
import type { Employee } from '../../../types/employe';
import OrderTable from '../../tables/orderTable';

// Extended Order type with customer, vehicle, and employee details
interface ExtendedOrder extends Order {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  vehicle_serial?: string;
  employee_name?: string;
}

const GetAllOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ExtendedOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { authToken } = useAuth();

  // Fetch all orders and enrich with customer/vehicle/employee data
  useEffect(() => {
    async function fetchOrders() {
      if (!authToken) {
        setError('Authentication token not found.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch orders
        const ordersResponse = await instance.get<{ orders: Order[] }>('/orders', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const ordersData = ordersResponse.data.orders || [];
        
        // Check if orders already have enriched data (customer_name, vehicle_make, etc.)
        const firstOrder = ordersData[0] as any;
        const hasEnrichedData = firstOrder && (
          firstOrder.customer_name || 
          firstOrder.vehicle_make || 
          firstOrder.employee_name
        );

        let enrichedOrders: ExtendedOrder[];

        if (hasEnrichedData) {
          // Backend already returns enriched data
          enrichedOrders = ordersData as ExtendedOrder[];
        } else {
          // Need to enrich the data - fetch customers, vehicles, and employees
          const [customersResponse, employeesResponse] = await Promise.all([
            instance.get<{ customers: Customer[] }>('/customers', {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            instance.get<{ employees: Employee[] }>('/employees', {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
          ]);

          const customers = customersResponse.data.customers || [];
          const employees = employeesResponse.data.employees || [];

          // Create a map of customer_id to vehicles (we'll need to fetch vehicles per customer)
          const customerVehicleMap = new Map<number, Vehicle[]>();

          // Enrich each order with customer, vehicle, and employee details
          enrichedOrders = await Promise.all(
            ordersData.map(async (order) => {
              const enriched: ExtendedOrder = { ...order };

              // Find employee using assignedEmployee field
              const employee = employees.find((e) => e.id === order.assignedEmployee);
              if (employee) {
                enriched.employee_name = employee.fullName;
              }

              // Find customer using owiningCustomer field
              const customer = customers.find((c) => c.id === order.owiningCustomer);
              if (customer) {
                enriched.customer_name = customer.fullName;
                enriched.customer_email = customer.email;
                enriched.customer_phone = customer.phoneNumber;

                // Fetch vehicles for this customer
                let vehicles = customerVehicleMap.get(customer.id);
                if (!vehicles) {
                  try {
                    const vehicleResponse = await instance.get<{ vehicles: Vehicle[] }>(
                      `/customers/${customer.id}/vehicle`,
                      {
                        headers: { Authorization: `Bearer ${authToken}` },
                      }
                    );
                    vehicles = vehicleResponse.data.vehicles || [];
                    customerVehicleMap.set(customer.id, vehicles);
                  } catch (err) {
                    console.error('Error fetching vehicles for customer:', customer.id, err);
                    vehicles = [];
                  }
                }

                // Find the vehicle using vehicle field
                const vehicle = vehicles.find((v) => v.id === order.vehicle);
                if (vehicle) {
                  enriched.vehicle_make = vehicle.vehicleMake;
                  enriched.vehicle_model = vehicle.vehicleModel;
                  enriched.vehicle_year = vehicle.vehicleYear;
                  enriched.vehicle_serial = vehicle.vehicleSerialNumber;
                }
              }

              return enriched;
            })
          );
        }

        setOrders(enrichedOrders);
      } catch (err: any) {
        console.error('Fetch Orders Error:', err);
        setError(err.response?.data?.msg || 'Failed to retrieve orders list.');
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [authToken]);

  const handleView = (orderId: number) => {
    navigate(`/admin/orders/view/${orderId}`);
  };

  const handleEdit = (orderId: number) => {
    navigate(`/admin/orders/edit/${orderId}`);
  };

  // Custom colors matching the design
  const headerTextColor = 'text-[#1D2B52]';
  const accentColor = 'bg-[#FF0000]';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full">
        {/* Header */}
        <div className={`text-3xl sm:text-4xl font-extrabold ${headerTextColor} mb-6 flex items-center`}>
          Orders
          <div className={`w-8 h-1 ml-3 ${accentColor} rounded-full`}></div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white shadow-md rounded-md p-8 text-center text-gray-500">
            Loading orders...
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-white shadow-md rounded-md p-8 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Orders Table */}
        {!isLoading && !error && (
          <OrderTable orders={orders} onView={handleView} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default GetAllOrders;

