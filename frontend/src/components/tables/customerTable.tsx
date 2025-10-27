import React from 'react';
import type { Customer } from '../../types/customer';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';


const customerData: Customer[] = [
  { id: 38, fullName: 'Tewdaj Alemu', email: "tewdaj@evangadi.com", phoneNumber: "90987766", createdAt: "05-31-2023 | 14:15", status: "Yes" },
  { id: 37, fullName: "Jasmine Bekele", email: "jasmine@gmail.com", phoneNumber: "240835487", createdAt: "05-24-2023 | 16:25", status: "Yes" },
  { id: 36, fullName: "Edom Samuel", email: "edom@gmail.com", phoneNumber: "2402542541", createdAt: "05-22-2023 | 20:00", status: "Yes" },
  { id: 35, fullName: "Biniam Biggt", email: "bbiggt@marketwatch.com", phoneNumber: "188-190-8935", createdAt: "05-20-2023 | 10:00", status: "Yes" },
  { id: 34, fullName: "Sara Riseley", email: "sriseleys@forbes.com", phoneNumber: "494-519-5915", createdAt: "05-20-2023 | 10:00", status: "Yes" },
];


function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const [firstName, ...rest] = fullName.trim().split(" ");
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

const Edit = () => (
  <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base">
    <EditIcon />
  </span>
);

const ViewAction = () => (
  <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base ml-2">
    <VisibilityIcon />
  </span>
);

const CustomerTable: React.FC = () => {
  const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Added Date", "Active", "Actions"];

  return (
    <div className=" bg-white rounded-lg shadow-xl overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-blue-900 text-white text-sm font-semibold tracking-wider uppercase">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-3 px-4 text-left whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {customerData.map((customer, index) => {
            const { firstName, lastName } = splitFullName(customer.fullName);

            return (
              <tr
                key={customer.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
              >
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{customer.id}</td>
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{firstName}</td>
                <td className="py-3 px-4 text-sm font-bold text-gray-800">{lastName}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{customer.email}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{customer.phoneNumber}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{customer.createdAt}</td>
                <td className="py-3 px-4 text-sm font-semibold text-green-600">{customer.status}</td>

                {/* Action Icons */}
                <td className="py-3 px-4 text-sm whitespace-nowrap">
                  <div className="flex items-center">
                    <Link to={'updatecustomer'}><Edit /></Link>
                    <ViewAction />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
