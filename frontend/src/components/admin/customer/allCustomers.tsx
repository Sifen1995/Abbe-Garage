import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomerTable from '../../tables/customerTable';

export default function AllCustomers() {
  return (
    <>
      <div className='flex flex-col ml-10 mt-6'>
        <h1 className='text-[40px] font-bold text-blue-950'>Customers</h1>
         <div className='flex items-center w-full max-w-xl border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 mt-[4%]'>
      
      {/* 2. Input Field: Takes most of the space, no border/outline (handled by parent) */}
      <input 
        type="text" 
        placeholder="Search..."
        className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-500 bg-white focus:outline-none"
      />
      
      {/* 3. Icon Wrapper: Fixed size, centered icon, acts as a button/visual aid */}
      <div className='flex items-center justify-center h-full px-3 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition duration-150'>
        {/* The Icon Component */}
        <SearchIcon className="w-5 h-5" /> 
      </div>
    </div>
  {/* table */}
    <div className='mt-[7%]'>
     <CustomerTable/>
    </div>
      </div>
    </>
  )
}
