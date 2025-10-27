import React from 'react'

export default function UpdateCustomer() {
  return (
    <>
          <div className='ml-[10%] flex flex-col mt-[8%]'>
        <h2 className='text-[42px] text-blue-950 mb-6 font-bold'>Add a new customer </h2>
        <form action="post">
            <div className='mb-6'>
                <input type="text" name='email' placeholder='Customer Email' className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 bg-white" />
            </div>
            <div className='mb-6'>
                <input type="text" name='first-name' placeholder='Customer First Name' className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>
            <div className='mb-6'>
                 <input type="text" name='last-name' placeholder='Customer Last Name' className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>

             <div className='mb-6'>
                 <input type="text" name='phone' placeholder='Customer phone(+25173665309)' className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>

            <div className='mb-8'>
                <input type="text" name='status' placeholder='Customer Status' className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"/>
            </div>

            <button className="w-1/6 bg-red-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium" type='submit'>
                Add Customer
            </button>
        </form>
      </div> 
    </>
  )
}
