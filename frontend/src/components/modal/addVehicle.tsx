import React, { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import instance from '../../Api/axios';

interface AddVehicleProps {
  onClose: () => void;
  
}


const AddVehicle: React.FC<AddVehicleProps> = ({ onClose } ) => { 

    const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    type: '',
    mileage: '',
    tag: '',
    serial: '',
    color: '',
  });


   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
        console.log('Submitting vehicle data:', formData);
        const response=await instance.post('/customers/1/vehicle')
    } catch (error) {
        
    }
    
    
    // Example: Add API call here...
    
    // 2. Close the modal after submission (or on error, depending on logic)
    onClose(); 
  };
  return (
    // Overlay for the modal background
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      {/* Modal Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl relative max-w-lg w-full">
        
        {/* Close Button (X icon) */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">
          &times; {/* HTML entity for 'x' */}
        </button>

        {/* Title Section */}
        <div className="mb-6 flex items-center">
          <h2 className="text-2xl text-blue-900 font-bold">Add a new vehicle</h2>
          <span className="ml-3 h-1 w-10 bg-red-600"></span>
        </div>

        {/* Form for Adding Vehicle */}
        <form>
          {/* Input: Vehicle year */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleYear' 
              placeholder='Vehicle year' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>

          {/* Input: Vehicle make */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleMake' 
              placeholder='Vehicle make' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>

          {/* Input: Vehicle model */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleModel' 
              placeholder='Vehicle model' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>

          {/* Input: Vehicle type */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleType' 
              placeholder='Vehicle type' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>
          
          {/* Input: Vehicle mileage */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleMileage' 
              placeholder='Vehicle mileage' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>

          {/* Input: Vehicle tag */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleTag' 
              placeholder='Vehicle tag' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>
          
          {/* Input: Vehicle serial */}
          <div className="mb-4">
            <input 
              type="text" 
              name='vehicleSerial' 
              placeholder='Vehicle serial' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>
          
          {/* Input: Vehicle color */}
          <div className="mb-6">
            <input 
              type="text" 
              name='vehicleColor' 
              placeholder='Vehicle color' 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" 
            />
          </div>

          {/* ADD VEHICLE Button */}
          <button 
            type='submit'
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-200 font-semibold uppercase tracking-wide shadow-md"
          >
            ADD VEHICLE
          </button>
        </form>
      </div> 
    </div>
  );
}

export default AddVehicle