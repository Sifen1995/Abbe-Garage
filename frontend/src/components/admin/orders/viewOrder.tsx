import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../../Api/axios';
import { useAuth } from '../../context/AuthContext';

interface Service {
  serviceName: string;
  serviceCompleted: boolean;
}

interface OrderView {
  id: number;
  owningCustomer: string;
  assignedMechanick: string;
  status: string;
  totalPrice: string;
  orderDate: string;
  estimatedCompletionDate: string;
  orderAdditionalRequests: string;
  services: Service[];
}

export default function ViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [order, setOrder] = useState<OrderView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- Fetch Order ---------------- */
  useEffect(() => {
    const fetchOrder = async () => {
      if (!authToken) {
            setError("Authentication token not found.");
            setLoading(false);
            return;
        }
      try {
        const res = await instance.get(`/orders/${id}`,{
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const o = res.data.order;

        setOrder({
          id: o.id,
          owningCustomer: o.owningCustomer,
          assignedMechanick: o.assignedMechanick,
          status: o.statusname,
          totalPrice: o.totalPrice,
          orderDate: new Date(o.orderDate).toLocaleDateString(),
          estimatedCompletionDate: new Date(
            o.orderEstimatedCompletionDate
          ).toLocaleDateString(),
          orderAdditionalRequests: o.orderAdditionalRequests || '—',
          services: o.services || [],
        });
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError('Unauthorized. Please login again.');
        } else {
          setError('Failed to load order.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, authToken]);

  /* ---------------- UI States ---------------- */
  if (loading) {
    return <div className="p-8 text-gray-500">Loading order...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!order) {
    return <div className="p-8 text-red-500">Order not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-950">
          Order Details #{order.id}
        </h1>

        <button
          onClick={() => navigate('/admin/orders')}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* ---------------- Order Info Table ---------------- */}
      <Table title="Order Information">
        <Row label="Customer" value={order.owningCustomer} />
        <Row label="Assigned Mechanic" value={order.assignedMechanick} />
        <Row label="Status" value={order.status} />
        <Row label="Total Price" value={`ETB ${order.totalPrice}`} />
        <Row label="Order Date" value={order.orderDate} />
        <Row
          label="Estimated Completion"
          value={order.estimatedCompletionDate}
        />
        <Row
          label="Additional Requests"
          value={order.orderAdditionalRequests}
        />
      </Table>

      {/* ---------------- Services Table ---------------- */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Services
        </h2>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Service Name</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {order.services.map((service, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{service.serviceName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          service.serviceCompleted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {service.serviceCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function Table({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
        {title}
      </div>
      <table className="w-full text-sm">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-2 font-medium text-gray-600 w-1/3">
        {label}
      </td>
      <td className="px-4 py-2 text-gray-800">{value}</td>
    </tr>
  );
}
