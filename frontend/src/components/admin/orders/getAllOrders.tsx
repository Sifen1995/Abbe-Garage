

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import OrderTable from '../../tables/orderTable';
import ViewOrder from './viewOrder';
import EditOrder from './editOrder';


export default function GetAllOrders() {
  const location = useLocation();

  const isMainOrdersPage = location.pathname === '/admin/orders';
  const isOrderDetail = location.pathname.includes('/admin/orders/view');
  const isOrderEdit = location.pathname.includes('/admin/orders/edit');
  return (
    <>
      {isMainOrdersPage ? (
        // If on "/admin/customers", show the customer list
        <div className="flex flex-col ml-10 mt-6">
          <h1 className="text-[40px] font-bold text-blue-950">Orders</h1>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-xl border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 mt-[4%]">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-500 bg-white focus:outline-none"
            />
            <div className="flex items-center justify-center h-full px-3 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition duration-150">
              <SearchIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Customer Table */}
          <div className="mt-[7%]">
            <OrderTable />
          </div>
        </div>
      ) :isOrderDetail ? (
        // Otherwise, show nested route (like UpdateCustomer)
        <div className="p-8 w-full"><ViewOrder /></div>
      ):isOrderEdit? (
         <div className="p-8 w-full"><EditOrder /></div>
      ):      
      (
        <div className="p-8 w-full">
          <Outlet />
        </div>
      )}
    </>
  );
}

