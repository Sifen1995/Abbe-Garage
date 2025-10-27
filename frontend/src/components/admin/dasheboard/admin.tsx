import React from 'react';
import s1 from '../../../assets/s1.png'
import s2 from '../../../assets/s2.png'
import s3 from '../../../assets/s3.png'
import s4 from '../../../assets/s4.png'
import s5 from '../../../assets/s5.png'
import s6 from '../../../assets/s6.png';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <>
      {/* Increased max-width and removed left margin for better layout */}
      <div className='max-w-full lg:max-w-[1200px] ml-[5%] p-6'>
        
        {/* Header Section */}
        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-800'>Admin Dashboard</h2>
          <p className='text-gray-600 max-w-[700px] mt-2'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab odit illum voluptas recusandae dignissimos iusto mollitia harum architecto similique exercitationem error fugiat nisi nam, reiciendis deleniti illo. Possimus, aperiam accusantium!
          </p>
        </div>

        {/* Cardes Section - ALIGNED IN A ROW */}
        <div className="flex flex-wrap gap-10 justify-start mb-10"> {/* <--- MODIFIED THIS CONTAINER */}

          {/* Card 1 */}
          <div className="flex-shrink-0"> {/* Use flex-shrink-0 to prevent card shrinking */}
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                   Orders
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                   All Orders
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                  READ MORE +
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s3} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-shrink-0">
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                    Orders
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  New Orders
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                  <Link to={'/'}> READ MORE +</Link>
                 
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s1} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-shrink-0">
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                   Employees
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                   All Employee
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                   <Link to={'/'}> READ MORE +</Link>
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s2} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

         


          
          {/* Removed empty placeholder divs */}
        </div>
        {/* 2nd row */}

         <div className="flex flex-wrap gap-10 justify-start mb-10"> {/* <--- MODIFIED THIS CONTAINER */}

          {/* Card 1 */}
          <div className="flex-shrink-0"> {/* Use flex-shrink-0 to prevent card shrinking */}
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                  Employees
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  Add Employee
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                    <Link to={'addemployee'}> READ MORE +</Link>
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s4} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-shrink-0">
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                   Customers
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  All Customers
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                  <Link to={'customers'}> READ MORE +</Link>
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s5} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-shrink-0">
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                   Customers
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  Add  Customers
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                   <Link to={'addcustomer'}> READ MORE +</Link>
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s6} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* 2nd row */}

          
          
          {/* Removed empty placeholder divs */}
        </div>
        {/* 3rd row */}

         <div className="flex flex-wrap gap-10 justify-start mb-[7%]"> {/* <--- MODIFIED THIS CONTAINER */}

          {/* Card 1 */}
          <div className="flex-shrink-0"> {/* Use flex-shrink-0 to prevent card shrinking */}
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                  Common Services
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  All Service
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                   <Link to={'addemployee'}> READ MORE +</Link>
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s1} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-shrink-0">
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                  Common Services
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  Add Service
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                   
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s6} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-shrink-0">
            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full min-w-[300px]">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
                  For Admin
                </p>
                <h3 className="text-xl font-bold text-[#002060] leading-snug">
                  Report
                </h3>
              </div>

              <div className="flex justify-between items-end mt-6">
                <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
                  <Link to={'addemployee'}> READ MORE +</Link>
                </p>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <img src={s3} alt="icon" className="w-8 h-8 opacity-70" />
                </div>
              </div>
            </div>
          </div>

         

          
          
          {/* Removed empty placeholder divs */}
        </div>
      </div>
    </>
  );
}