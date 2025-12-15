import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import instance from '../../../Api/axios';
import type { Order } from '../../../types/orders';
import type { Customer } from '../../../types/customer';
import type { Vehicle } from '../../../types/vehicle';
import type { Employee } from '../../../types/employe';

const EditOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    status: '',
    totalPrice: '',
    estimatedCompletionDate: '',
    completionDate: '',
    assignedEmployee: '',
    additonalRequests: '',
    additonalRequestsCompletionDate: false,
    service_completed: false,
  });

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

        // Fetch customers, employees first
        const [customersResponse, employeesResponse] = await Promise.all([
          instance.get<{ customers: Customer[] }>('/customers', {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          instance.get<{ employees: Employee[] }>('/employees', {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        const customersList = customersResponse.data.customers || [];
        const employeesList = employeesResponse.data.employees || [];
        
        setCustomers(customersList);
        setEmployees(employeesList);

        // Fetch customer details
        let customerData: Customer | null = null;
        try {
          const customerResponse = await instance.get<{ customer: Customer }>(
            `/customers/${orderData.owiningCustomer}`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          customerData = customerResponse.data.customer;
          setCustomer(customerData);
          console.log('Customer fetched:', customerData);
        } catch (err) {
          console.error('Error fetching customer:', err);
          // Try to find customer from the list
          const foundCustomer = customersList.find(
            (c) => c.id === orderData.owiningCustomer
          );
          if (foundCustomer) {
            customerData = foundCustomer;
            setCustomer(foundCustomer);
          }
        }

        // Fetch vehicles for the customer
        let vehicleData: Vehicle | null = null;
        try {
          const vehicleResponse = await instance.get<{ vehicles: Vehicle[] }>(
            `/customers/${orderData.owiningCustomer}/vehicle`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          const vehiclesData = vehicleResponse.data.vehicles || [];
          setVehicles(vehiclesData);
          
          const foundVehicle = vehiclesData.find((v) => v.id === orderData.vehicle);
          if (foundVehicle) {
            vehicleData = foundVehicle;
            setVehicle(foundVehicle);
            console.log('Vehicle found:', foundVehicle);
          } else {
            console.log('Vehicle not found. Order vehicle ID:', orderData.vehicle, 'Available vehicles:', vehiclesData);
          }
        } catch (err) {
          console.error('Error fetching vehicles:', err);
        }

        // Set form data with all fields auto-populated
        // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
        const formatDateForInput = (dateString: string | null | undefined): string => {
          if (!dateString) return '';
          try {
            const date = new Date(dateString);
            // Get local timezone offset and adjust
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          } catch (err) {
            console.error('Error formatting date:', dateString, err);
            return '';
          }
        };

        const estDate = formatDateForInput(orderData.estimatedCompletionDate);
        const compDate = formatDateForInput(orderData.completionDate);

        console.log('Order data:', orderData);
        console.log('Estimated date formatted:', estDate);
        console.log('Assigned employee:', orderData.assignedEmployee);

        // Check if order has service_completed field (might be in response but not in type)
        const orderWithService = orderData as any;
        const serviceCompleted = orderWithService.service_completed !== undefined 
          ? orderWithService.service_completed 
          : false;

        const initialFormData = {
          status: orderData.status || '',
          totalPrice: orderData.totalPrice || '',
          estimatedCompletionDate: estDate,
          completionDate: compDate,
          assignedEmployee: String(orderData.assignedEmployee || ''),
          additonalRequests: orderData.additonalRequests || '',
          additonalRequestsCompletionDate: orderData.additonalRequestsCompletionDate || false,
          service_completed: serviceCompleted,
        };

        console.log('Setting form data:', initialFormData);
        setFormData(initialFormData);
      } catch (err: any) {
        console.error('Fetch Order Error:', err);
        setError(err.response?.data?.msg || 'Failed to retrieve order details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrderDetails();
  }, [authToken, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!order) return;

    setIsSubmitting(true);

    try {
      // Format dates
      const estDate = formData.estimatedCompletionDate
        ? new Date(formData.estimatedCompletionDate).toISOString()
        : order.estimatedCompletionDate;
      
      const compDate = formData.completionDate
        ? new Date(formData.completionDate).toISOString()
        : null;

      // Prepare update data
      const updateData: any = {
        status: formData.status,
        totalPrice: formData.totalPrice,
        estimatedCompletionDate: estDate,
        completionDate: compDate,
        assignedEmployee: Number(formData.assignedEmployee),
        additonalRequests: formData.additonalRequests || null,
        additonalRequestsCompletionDate: formData.additonalRequestsCompletionDate,
        service_completed: formData.service_completed,
      };

      await instance.put(`/orders/${id}`, updateData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setSuccess('Order updated successfully!');
      setTimeout(() => {
        navigate('/admin/orders');
      }, 1500);
    } catch (err: any) {
      console.error('Update Order Error:', err);
      setError(err.response?.data?.msg || 'Failed to update order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const headerTextColor = 'text-[#1D2B52]';
  const accentColor = 'bg-[#FF0000]';
  const buttonColor = 'bg-[#FF0000] hover:bg-[#D40000]';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading order details...</div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className={`text-3xl sm:text-4xl font-extrabold ${headerTextColor} flex items-center`}>
            Edit Order #{order?.id}
            <div className={`w-8 h-1 ml-3 ${accentColor} rounded-full`}></div>
          </div>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-sm font-semibold text-[#1D2B52] hover:text-black underline"
          >
            Back to Orders
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Error and Success Messages */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              {success}
            </div>
          )}

          {/* Customer (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            {isLoading ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                Loading...
              </div>
            ) : (customer ? (
  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
    <div className="text-gray-800 font-medium">
      {customer.fullName}
    </div>
    <div className="text-sm text-gray-600">{customer.email}</div>
    <div className="text-sm text-gray-600">
      {customer.phoneNumber || customer.phoneNumber}
    </div>
  </div>
) : (
  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
    Customer ID: {order?.owiningCustomer}
  </div>
))
}
          </div>

          {/* Vehicle (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle</label>
            {isLoading ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                Loading...
              </div>
            ) : (vehicle ? (
  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
    <div className="text-gray-800 font-medium">
      {(vehicle.vehicleMake )} {(vehicle.vehicleModel )}
    </div>
    <div className="text-sm text-gray-600">
      Year: {vehicle.vehicleYear }
    </div>
    <div className="text-sm text-gray-600">
      Serial: {vehicle.vehicleSerialNumber }
    </div>
    <div className="text-sm text-gray-600">
      Tag: {vehicle.vehicleTag }
    </div>
  </div>
) : (
  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
    Vehicle ID: {order?.vehicle}
  </div>
))
}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
              <option value="Received">Received</option>
            </select>
          </div>

          {/* Assigned Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Employee *
            </label>
            <select
              name="assignedEmployee"
              value={formData.assignedEmployee}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
              required
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={String(emp.id)}>
                  {emp.fullName} ({emp.role})
                </option>
              ))}
            </select>
            {formData.assignedEmployee && !employees.find(e => String(e.id) === formData.assignedEmployee) && (
              <p className="text-xs text-gray-500 mt-1">
                Current: Employee ID {formData.assignedEmployee} (not found in list)
              </p>
            )}
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Price *</label>
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
              required
            />
          </div>

          {/* Estimated Completion Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Completion Date *
            </label>
            <input
              type="datetime-local"
              name="estimatedCompletionDate"
              value={formData.estimatedCompletionDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
              required
            />
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Completion Date
            </label>
            <input
              type="datetime-local"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
            />
          </div>

          {/* Additional Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Requests
            </label>
            <textarea
              name="additonalRequests"
              value={formData.additonalRequests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
              placeholder="Enter any additional requests or notes..."
            />
          </div>

          {/* Additional Requests Completion Date */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="additonalRequestsCompletionDate"
              checked={formData.additonalRequestsCompletionDate}
              onChange={handleChange}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Additional Requests Completed
            </label>
          </div>

          {/* Service Completed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="service_completed"
              checked={formData.service_completed}
              onChange={handleChange}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Service Completed
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded-md transition ${buttonColor} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Updating...' : 'Update Order'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/orders')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;

