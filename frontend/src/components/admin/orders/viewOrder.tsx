import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import instance from '../../../Api/axios';
import type { Order } from '../../../types/orders';
import type { Customer } from '../../../types/customer';
import type { Vehicle } from '../../../types/vehicle';
import type { Employee } from '../../../types/employe';

const ViewOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!authToken || !id) {
        setError('Authentication token or order ID not found.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch order
        const orderResponse = await instance.get<{ order: Order }>(`/orders/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const orderData = orderResponse.data.order;
        setOrder(orderData);

        // Fetch customer, employee, and vehicle details
        const [customerResponse, employeeResponse] = await Promise.all([
          instance.get<{ customer: Customer }>(`/customers/${orderData.owiningCustomer}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          instance.get<{ employee: Employee }>(`/employees/${orderData.assignedEmployee}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        setCustomer(customerResponse.data.customer);
        setEmployee(employeeResponse.data.employee);

        // Fetch vehicle
        const vehicleResponse = await instance.get<{ vehicles: Vehicle[] }>(
          `/customers/${orderData.owiningCustomer}/vehicle`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const vehicles = vehicleResponse.data.vehicles || [];
        const foundVehicle = vehicles.find((v) => v.id === orderData.vehicle);
        if (foundVehicle) {
          setVehicle(foundVehicle);
        }
      } catch (err: any) {
        console.error('Fetch Order Error:', err);
        setError(err.response?.data?.msg || 'Failed to retrieve order details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderDetails();
  }, [authToken, id]);

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return '—';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed') {
      return 'bg-green-100 text-green-800';
    } else if (statusLower === 'in progress' || statusLower === 'inprogress') {
      return 'bg-yellow-100 text-yellow-800';
    } else if (statusLower === 'received' || statusLower === 'pending') {
      return 'bg-gray-100 text-gray-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const headerTextColor = 'text-[#1D2B52]';
  const accentColor = 'bg-[#FF0000]';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error || 'Order not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`text-3xl sm:text-4xl font-extrabold ${headerTextColor} flex items-center`}>
            Order Details
            <div className={`w-8 h-1 ml-3 ${accentColor} rounded-full`}></div>
          </div>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-sm font-semibold text-[#1D2B52] hover:text-black underline"
          >
            Back to Orders
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Order ID and Status */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Order ID</h3>
              <p className="text-2xl font-bold text-gray-800">{order.id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-800 font-medium">{customer?.fullName || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{customer?.email || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">{customer?.phoneNumber || '—'}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Make & Model</p>
                <p className="text-gray-800 font-medium">
                  {vehicle ? `${vehicle.vehicleMake} ${vehicle.vehicleModel}` : '—'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="text-gray-800 font-medium">{vehicle?.vehicleYear || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Serial Number</p>
                <p className="text-gray-800 font-medium">{vehicle?.vehicleSerialNumber || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Color</p>
                <p className="text-gray-800 font-medium">{vehicle?.vehicleColor || '—'}</p>
              </div>
            </div>
          </div>

          {/* Employee Information */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Assigned Employee</h3>
            <div>
              <p className="text-gray-800 font-medium">{employee?.fullName || '—'}</p>
              <p className="text-sm text-gray-500">{employee?.email || '—'}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="text-gray-800 font-medium">{formatDate(order.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-gray-800 font-medium">${order.totalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Completion</p>
                <p className="text-gray-800 font-medium">
                  {formatDate(order.estimatedCompletionDate)}
                </p>
              </div>
              {order.completionDate && (
                <div>
                  <p className="text-sm text-gray-500">Completion Date</p>
                  <p className="text-gray-800 font-medium">{formatDate(order.completionDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Requests */}
          {order.additonalRequests && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Requests</h3>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{order.additonalRequests}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => navigate(`/admin/orders/edit/${id}`)}
              className="px-6 py-2 bg-[#FF0000] text-white rounded-md hover:bg-[#D40000] transition"
            >
              Edit Order
            </button>
            <button
              onClick={() => navigate('/admin/orders')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

