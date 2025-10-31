import React from 'react'

export default function UpdateCustomer() {
  return (
    <>
        <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
    {/* Outer container for the form section */}
    <div className="w-full max-w-3xl bg-white p-10 shadow-lg rounded-lg">
        
        {/* Header Section: "Edit: Jasmine Albeshir" with red underline */}
        <h2 className="text-3xl font-bold text-[#002060] mb-4 flex items-center">
            Edit: Jasmine Albeshir
            <span className="ml-3 h-1 w-10 bg-red-600"></span>
        </h2>
        
        {/* Customer Email Detail */}
        <p className="text-gray-700 text-lg mb-8 font-semibold">
            Customer email: jasmine@gmail.com
        </p>

        {/* Form Fields Container */}
        <div className="space-y-6">
            
            {/* 1. First Name Input */}
            <input 
                type="text" 
                placeholder="Jasmine"
                defaultValue="Jasmine"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
            {/* 2. Last Name Input */}
            <input 
                type="text" 
                placeholder="Albeshir"
                defaultValue="Albeshir"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
            {/* 3. Phone Number Input */}
            <input 
                type="text" 
                placeholder="240835487"
                defaultValue="240835487"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* 4. Checkbox: Is active customer */}
            <div className="flex items-center pt-3">
                <input 
                    id="isActive" 
                    type="checkbox" 
                    defaultChecked 
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label 
                    htmlFor="isActive" 
                    className="ml-2 text-lg font-medium text-gray-700 select-none"
                >
                    Is active customer
                </label>
            </div>
            
            {/* 5. Update Button */}
            <button
                type="submit"
                className="mt-8 px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-wide rounded-md shadow-lg hover:bg-red-700 transition duration-200"
            >
                UPDATE
            </button>
        </div>
    </div>
</div>
    </>
  )
}
