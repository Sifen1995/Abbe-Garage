import React, { useState, type FormEvent } from "react";
// Assuming these are correctly configured for your project
import instance from "../../Api/axios"; 
import { useAuth } from "../../components/context/AuthContext"; 

// 1. Interfaces for Type Safety

// Defines the data structure as it is held in the React component state (all strings from form inputs)
interface VehicleFormData {
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleMileage: string;
  vehicleTag: string;
  vehicleSerialNumber: string;
  vehicleColor: string;
}

// Defines the props accepted by the AddVehicle component
interface AddVehicleProps {
  onClose: () => void;
  customerId: number | string;
}

// Defines the final data structure expected by the API endpoint 
// (Year and Mileage must be number/null)
interface VehicleApiPayload {
  customerId: number | string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleMileage: number | null;
  vehicleTag: string;
  vehicleSerialNumber: string;
  vehicleColor: string;
}


const AddVehicle: React.FC<AddVehicleProps> = ({ onClose, customerId }) => {
  const { authToken } = useAuth();

  // Initialize state with empty strings for controlled inputs
  const [formData, setFormData] = useState<VehicleFormData>({
    vehicleYear: "", 
    vehicleMake: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleMileage: "", 
    vehicleTag: "",
    vehicleSerialNumber: "",
    vehicleColor: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // --- Prepare Data Payload and Parse Integers ---
    
    // 1. Parse Year: If not empty, convert to integer. Use null otherwise.
    
    
    // 2. Parse Mileage: Remove commas, then convert to integer. Use null otherwise.
    const mileageValue = formData.vehicleMileage.replace(/,/g, '').trim();
    const parsedMileage = mileageValue && !isNaN(Number(mileageValue)) ? parseInt(mileageValue, 10) : null;

    // Construct the final payload for the API
    const dataToSend: VehicleApiPayload = {
      customerId,
      // Include all string fields directly
      vehicleMake: formData.vehicleMake,
      vehicleModel: formData.vehicleModel,
      vehicleType: formData.vehicleType,
      vehicleTag: formData.vehicleTag,
      vehicleSerialNumber: formData.vehicleSerialNumber,
      vehicleColor: formData.vehicleColor,
      // Override with parsed number fields
      vehicleYear: formData.vehicleYear,
      vehicleMileage: parsedMileage,
    };
    // ---------------------------------------------


    try {
      const response = await instance.post(
        `/customers/${customerId}/vehicle`,
        dataToSend, // Send the payload with correct number types
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSuccess("Vehicle added successfully!");

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      console.error("Add Vehicle Error:", err.response?.data || err);
      setError(err.response?.data?.msg || "Failed to add vehicle.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-2xl relative transform transition-all duration-300">
        
        {/* Close Button (X icon) */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-3xl transition duration-150"
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-extrabold text-blue-900 mb-6 flex items-center">
          Add New Vehicle
          <span className="ml-3 h-1 w-8 bg-red-600 rounded"></span>
        </h2>

        {error && <div className="text-sm text-red-700 mb-3 p-3 bg-red-100 rounded-lg border border-red-300">{error}</div>}
        {success && <div className="text-sm text-green-700 mb-3 p-3 bg-green-100 rounded-lg border border-green-300">{success}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* Vehicle Year (Required, numeric input) */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleYear"
              placeholder="Vehicle Year (e.g., 2022)"
              value={formData.vehicleYear}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>

          {/* Vehicle Make (Required) */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleMake"
              placeholder="Vehicle Make"
              value={formData.vehicleMake}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          
          {/* Vehicle Model */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleModel"
              placeholder="Vehicle Model"
              value={formData.vehicleModel}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          
          {/* Vehicle Type */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleType"
              placeholder="Vehicle Type (e.g., SUV, Sedan)"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>

          {/* Vehicle Mileage (Required, numeric input, handles commas) */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleMileage"
              placeholder="Vehicle Mileage (e.g., 18,500)"
              value={formData.vehicleMileage}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          
          {/* Vehicle Tag */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleTag"
              placeholder="Vehicle Tag (License Plate)"
              value={formData.vehicleTag}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          
          {/* Vehicle Serial */}
          <div className="mb-4">
            <input
              type="text"
              name="vehicleSerialNumber"
              placeholder="Vehicle Serial (VIN)"
              value={formData.vehicleSerialNumber}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          
          {/* Vehicle Color */}
          <div className="mb-6">
            <input
              type="text"
              name="vehicleColor"
              placeholder="Vehicle Color"
              value={formData.vehicleColor}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-extrabold uppercase tracking-widest shadow-lg"
          >
            ADD VEHICLE
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;