import React from 'react'

export default function UpdateEmployee() {
  return (
    <>
      <div className="flex justify-center p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
    {/* Outer container for the form card */}
    <div className="w-full max-w-3xl bg-white p-10 shadow-lg rounded-lg">
        
        {/* Header Section: "Edit: Adugna Bekele" with red underline */}
        <h2 className="text-3xl font-bold text-[#002060] mb-4 flex items-center">
            Edit: Adugna Bekele
            <span className="ml-3 h-1 w-10 bg-red-600"></span>
        </h2>
        
        {/* Employee Email Detail */}
        <p className="text-gray-700 text-lg mb-8 font-semibold">
            Employee email: aadug17@gmail.com
        </p>

        {/* Form Fields Container */}
        <form className="space-y-6">
            
            {/* 1. First Name Input */}
            <input 
                type="text" 
                placeholder="Adugna"
                defaultValue="Adugna"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
            {/* 2. Last Name Input */}
            <input 
                type="text" 
                placeholder="Bekele"
                defaultValue="Bekele"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
            {/* 3. Phone Number Input */}
            <input 
                type="text" 
                placeholder="2023862702"
                defaultValue="2023862702"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* 4. Role Selection Dropdown */}
            <div className="relative">
                <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    defaultValue="Employee"
                >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                {/* Custom arrow icon placeholder for select */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    &#9660; 
                </div>
            </div>

            {/* 5. Checkbox: Is active employee */}
            <div className="flex items-center pt-3">
                <input 
                    id="isActiveEmployee" 
                    type="checkbox" 
                    defaultChecked 
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                />
                <label 
                    htmlFor="isActiveEmployee" 
                    className="ml-2 text-lg font-medium text-gray-700 select-none"
                >
                    Is active employee
                </label>
            </div>
            
            {/* 6. Update Button */}
            <button
                type="submit"
                className="mt-8 px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-wide rounded-md shadow-lg hover:bg-red-700 transition duration-200"
            >
                UPDATE
            </button>
        </form>
    </div>
</div>
    </>
  )
}
