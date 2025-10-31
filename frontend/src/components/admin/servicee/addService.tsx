import React from 'react'

export default function AddService() {
  return (
    <>
      <div className="flex justify-center p-8 bg-gray-50 min-h-[50vh] mt-8">
    {/* Outer container for the card */}
    <div className="w-full max-w-2xl bg-white p-10 shadow-lg rounded-lg">
        
        {/* Title Section: "Add a new service" with red underline */}
        <h2 className="text-2xl font-bold text-[#002060] mb-8 flex items-center">
            Add a new service
            <span className="ml-3 h-1 w-10 bg-red-600"></span>
        </h2>

        {/* Form Fields Container */}
        <div className="space-y-6">
            
            {/* 1. Service Name Input */}
            <div className="relative">
                <input 
                    type="text" 
                    id="serviceName"
                    placeholder=" " /* Placeholder required for floating label trick */
                    className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                />
                {/* Floating Label Style */}
                <label 
                    htmlFor="serviceName"
                    className="absolute top-2 left-4 text-sm text-gray-500 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
                >
                    Service name
                </label>
            </div>
            
            {/* 2. Service Description Textarea */}
            <div className="relative">
                <textarea
                    id="serviceDescription"
                    rows={8}
                    placeholder=" "
                    className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                ></textarea>
                {/* Floating Label Style */}
                <label 
                    htmlFor="serviceDescription"
                    className="absolute top-2 left-4 text-sm text-gray-500 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
                >
                    Service description
                </label>
            </div>
            
            {/* 3. Add Service Button */}
            <button
                type="submit"
                className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold uppercase tracking-wider rounded-md shadow-md hover:bg-red-700 transition duration-200"
            >
                ADD SERVICE
            </button>
        </div>
    </div>
</div>
    </>
  )
}
