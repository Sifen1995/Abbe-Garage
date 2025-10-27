import React, { type JSX } from 'react';
import { NavLink } from 'react-router-dom';

// Define the available tabs (same as before)
type AdminTab =
  | 'Dashboard'
  | 'Orders'
  | 'New order'
  | 'Add employee'
  | 'Employees'
  | 'Add customer'
  | 'Customers'
  | 'Services';

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const menuItems: { label: AdminTab; path: string }[] = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Orders', path: '/admin/orders' },
  { label: 'New order', path: '/admin/neworder' },
  { label: 'Add employee', path: '/admin/addemployee' },
  { label: 'Employees', path: '/admin/employees' },
  { label: 'Add customer', path: '/admin/addcustomer' },
  { label: 'Customers', path: '/admin/customers' },
  { label: 'Services', path: '/admin/services' },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps): JSX.Element {
  // Base style classes (same as your original)
  const baseLinkClass =
    'block px-5 py-3 text-sm font-medium transition duration-150 ease-in-out cursor-pointer';
  const defaultClass = `${baseLinkClass} text-gray-300 hover:bg-gray-700 hover:text-white`;
  const activeClass = `${baseLinkClass} bg-red-600 text-white`;

  return (
    <aside className="w-64 bg-[#232f3c] min-h-screen shadow-2xl">
      {/* Sidebar Header */}
      <div className="px-5 py-4 border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold">ADMIN MENU</h2>
      </div>

      {/* Navigation Links */}
      <nav className="mt-2">
        {menuItems.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            end
            onClick={() => setActiveTab(label)}
            className={({ isActive }) => (isActive ? activeClass : defaultClass)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
