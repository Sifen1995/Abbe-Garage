import React, { useState } from 'react';
import { type Customer } from '../../../types/customer';
import { type Vehicle } from '../../../types/vehicle';
import VehiclesOfCustomer from '../../tables/vehiclesOfCustomer';

type AddOrderTowProps = {
  customer: Customer;
  onBack: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
};

const AddOrderTow: React.FC<AddOrderTowProps> = ({ customer, onBack, onSelectVehicle }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    onSelectVehicle(vehicle);
  };
  
  // Custom colors based on the image (Dark Blue/Red)
  const headerTextColor = 'text-[#1D2B52]'; // Dark blue/black color for headers
  const accentColor = 'bg-[#FF0000]'; // Bright red accent color

  return (
    // Outer container: Apply subtle background color and spacing
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
        
        {/* Header: Create a new order */}
        <div className="flex items-center justify-between mb-6">
          <div className={`text-3xl sm:text-4xl font-extrabold ${headerTextColor} flex items-center`}>
            Create a new order
            <div className={`w-8 h-1 ml-3 ${accentColor} rounded-full`}></div>
          </div>
          <button
            onClick={onBack}
            className="text-sm font-semibold text-[#1D2B52] hover:text-black underline"
          >
            Back to customer search
          </button>
        </div>

        {/* Selected customer */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-500 mb-1">Customer</p>
          <div className="text-lg font-semibold text-gray-800">{customer.fullName}</div>
          <div className="text-sm text-gray-600">
            {customer.email} · {customer.phoneNumber ?? 'No phone'}
          </div>
        </div>

        {/* Vehicles list */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer vehicles</h3>
          <VehiclesOfCustomer
            customerId={customer.id}
            onSelectVehicle={handleSelectVehicle}
          />
          {selectedVehicle && (
            <div className="mt-3 p-3 border border-green-200 rounded-md bg-green-50 text-sm text-gray-800">
              Selected vehicle: {selectedVehicle.vehicleYear} {selectedVehicle.vehicleMake}{" "}
              {selectedVehicle.vehicleModel} ({selectedVehicle.vehicleTag})
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddOrderTow;