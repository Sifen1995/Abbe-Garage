import React from 'react';
import type { Order } from '../../types/orders';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Extended Order type with customer, vehicle, and employee details
interface ExtendedOrder extends Order {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  vehicle_serial?: string;
  employee_name?: string;
}

interface OrderTableProps {
  orders: ExtendedOrder[];
  onView?: (orderId: number) => void;
  onEdit?: (orderId: number) => void;
}

const Edit = ({ onClick }: { onClick: () => void }) => (
  <span
    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base"
    onClick={onClick}
  >
    <EditIcon />
  </span>
);

const ViewAction = ({ onClick }: { onClick: () => void }) => (
  <span
    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-base ml-2"
    onClick={onClick}
  >
    <VisibilityIcon />
  </span>
);

// Format date to DD/MM/YYYY
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '—';
  }
};

// Get status badge color
const getStatusBadgeColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower === 'completed') {
    return 'bg-green-100 text-green-800';
  } else if (statusLower === 'in progress' || statusLower === 'inprogress') {
    return 'bg-yellow-100 text-yellow-800';
  } else if (statusLower === 'received' || statusLower === 'pending') {
    return 'bg-gray-100 text-gray-800';
  }
  return 'bg-gray-100 text-gray-800';
};

const OrderTable: React.FC<OrderTableProps> = ({ orders, onView, onEdit }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-md p-4 text-gray-500 text-center">
        No orders found
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-md overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="py-3 px-4 font-semibold text-gray-700">Order Id</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Customer</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Vehicle</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Order Date</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Received by</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Order status</th>
            <th className="py-3 px-4 font-semibold text-gray-700 text-center">View/Edit</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`border-t transition duration-150 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-50`}
            >
              {/* Order Id */}
              <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                {order.id}
              </td>

              {/* Customer */}
              <td className="py-3 px-4 text-sm">
                <div className="text-gray-800 font-medium">
                  {order.customer_name || '—'}
                </div>
                <div className="text-gray-600 text-xs">
                  {order.customer_email || '—'}
                </div>
                <div className="text-gray-600 text-xs">
                  {order.customer_phone || '—'}
                </div>
              </td>

              {/* Vehicle */}
              <td className="py-3 px-4 text-sm">
                <div className="text-gray-800 font-medium">
                  {order.vehicle_make && order.vehicle_model
                    ? `${order.vehicle_make} ${order.vehicle_model}`
                    : '—'}
                </div>
                <div className="text-gray-600 text-xs">
                  {order.vehicle_year || '—'}
                </div>
                <div className="text-gray-600 text-xs">
                  {order.vehicle_serial || '—'}
                </div>
              </td>

              {/* Order Date */}
              <td className="py-3 px-4 text-sm text-gray-700">
                {formatDate(order.date)}
              </td>

              {/* Received by */}
              <td className="py-3 px-4 text-sm text-gray-700">
                {order.employee_name || '—'}
              </td>

              {/* Order status */}
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                    order.status || 'Pending'
                  )}`}
                >
                  {order.status || 'Pending'}
                </span>
              </td>

              {/* View/Edit */}
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center">
                  {onView && (
                    <ViewAction onClick={() => onView(order.id)} />
                  )}
                  {onEdit && (
                    <Edit onClick={() => onEdit(order.id)} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

