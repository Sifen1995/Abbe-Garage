import React, { useState, useEffect } from 'react';
import { type Customer } from '../../../types/customer';
import { type Vehicle } from '../../../types/vehicle';
import { type Serivce } from '../../../types/service';
import { type Employee } from '../../../types/employe';
import { type CreateOrderRequest } from '../../../types/orders';
import { useAuth } from '../../context/AuthContext';
import instance from '../../../Api/axios';

type AddOrderThreeProps = {
  customer: Customer;
  vehicle: Vehicle;
  onBack: () => void;
  onDeselectCustomer?: () => void;
  onDeselectVehicle?: () => void;
};

const AddOrderThree: React.FC<AddOrderThreeProps> = ({
  customer,
  vehicle,
  onBack,
  onDeselectCustomer,
  onDeselectVehicle,
}) => {
  const [services, setServices] = useState<Serivce[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | ''>('');
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
  const [estimatedCompletionDateLocal, setEstimatedCompletionDateLocal] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { authToken } = useAuth();

  // Fetch services and employees
  useEffect(() => {
    async function fetchData() {
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch services
        const servicesResponse = await instance.get('/services', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setServices(servicesResponse.data.service || []);

        // Fetch employees
        const employeesResponse = await instance.get('/employees', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setEmployees(employeesResponse.data.employees || []);
      } catch (error) {
        console.error('Fetch data error:', error);
        setError('Failed to load services or employees');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [authToken]);

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Generate order hash (simple hash function)
  const generateOrderHash = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`.substring(0, 20);
  };

  // Format date to "YYYY-MM-DD HH:mm:ss" for backend
  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Convert datetime-local format (YYYY-MM-DDTHH:mm) to backend format (YYYY-MM-DD HH:mm:ss)
  const convertToBackendFormat = (dateTimeLocal: string): string => {
    if (!dateTimeLocal) return '';
    const date = new Date(dateTimeLocal);
    return formatDateTime(date);
  };

  // Convert backend format to datetime-local format for input
  const convertToLocalFormat = (backendDate: string): string => {
    if (!backendDate) return '';
    const date = new Date(backendDate.replace(' ', 'T'));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!selectedEmployeeId) {
      setError('Please select an employee');
      return;
    }

    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (!estimatedCompletionDateLocal) {
      setError('Please select an estimated completion date');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDate = formatDateTime(new Date());
      const baseOrderHash = generateOrderHash();
      
      // Create one order for each selected service
      const orderPromises = selectedServices.map((serviceId, index) => {
        const orderHash = index === 0 ? baseOrderHash : generateOrderHash();
        
        const trimmedDescription = serviceDescription.trim();
        const orderData: CreateOrderRequest = {
          customer_id: customer.id,
          employee_id: Number(selectedEmployeeId),
          order_date: orderDate,
          order_hash: orderHash,
          vehicle_id: vehicle.id,
          order_total_price: Number(price),
          order_estimated_completion_date: convertToBackendFormat(estimatedCompletionDateLocal),
          service_id: serviceId,
          service_completed: 'false',
          order_additional_requests: trimmedDescription || null,
        };

        console.log('Order data being sent:', orderData);
        console.log('Additional requests value:', trimmedDescription);

        return instance.post('/orders', orderData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      });

      // Wait for all orders to be created
      await Promise.all(orderPromises);

      setSuccess(`Successfully created ${selectedServices.length} order(s)!`);
      
      // Reset form after success
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err: any) {
      console.error('Order submission error:', err);
      setError(err.response?.data?.msg || 'Failed to create order(s). Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom colors
  const headerTextColor = 'text-[#1D2B52]';
  const accentColor = 'bg-[#FF0000]';
  const buttonColor = 'bg-[#FF0000] hover:bg-[#D40000]';

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
        {/* Header: Create a new order */}
        <div className={`text-3xl sm:text-4xl font-extrabold ${headerTextColor} mb-8 flex items-center`}>
          Create a new order
          <div className={`w-8 h-1 ml-3 ${accentColor} rounded-full`}></div>
        </div>

        {/* Customer Information */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
          <button
            onClick={onDeselectCustomer}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold"
          >
            ×
          </button>
          <div className="pr-8">
            <p className="text-sm text-gray-500 mb-2">Customer</p>
            <div className="text-lg font-semibold text-gray-800 mb-2">{customer.fullName}</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Email: {customer.email}</div>
              <div>Phone Number: {customer.phoneNumber || 'N/A'}</div>
              <div>Active Customer: {customer.status === 'active' ? 'Yes' : 'No'}</div>
            </div>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit customer info:
            </button>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
          <button
            onClick={onDeselectVehicle}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold"
          >
            ×
          </button>
          <div className="pr-8">
            <p className="text-sm text-gray-500 mb-2">Vehicle</p>
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {vehicle.vehicleMake} {vehicle.vehicleModel}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Vehicle color: {vehicle.vehicleColor}</div>
              <div>Vehicle tag: {vehicle.vehicleTag}</div>
              <div>Vehicle year: {vehicle.vehicleYear}</div>
              <div>Vehicle mileage: {vehicle.vehicleMileage.toLocaleString()} km</div>
              <div>Vehicle serial: {vehicle.vehicleSerialNumber}</div>
            </div>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit vehicle info:
            </button>
          </div>
        </div>

        {/* Employee Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Employee *
          </label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value ? Number(e.target.value) : '')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName} ({employee.role})
              </option>
            ))}
          </select>
        </div>

        {/* Choose service Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose service *</h3>
          {isLoading ? (
            <div className="text-gray-500">Loading services...</div>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-gray-700">{service.name}</span>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional requests Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional requests</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service description
              </label>
              <textarea
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
                placeholder="Enter any additional service requests or notes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Completion Date *
              </label>
              <input
                type="datetime-local"
                value={estimatedCompletionDateLocal}
                onChange={(e) => {
                  setEstimatedCompletionDateLocal(e.target.value);
                  if (e.target.value) {
                    setEstimatedCompletionDate(convertToBackendFormat(e.target.value));
                  } else {
                    setEstimatedCompletionDate('');
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D2B52]"
                required
              />
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {success}
          </div>
        )}

        {/* Submit Order Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full px-8 py-3 text-white text-lg font-semibold rounded-md uppercase tracking-wide transition duration-200 shadow-md ${buttonColor} transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ORDER'}
        </button>
      </div>
    </div>
  );
};

export default AddOrderThree;
