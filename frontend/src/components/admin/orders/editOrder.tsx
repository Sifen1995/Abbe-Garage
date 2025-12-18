import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../../Api/axios';
import { useAuth } from '../../context/AuthContext';

interface Service {
  serviceName: string;
  serviceCompleted: boolean;
}

interface OrderForm {
  owningCustomer: string;
  assignedMechanick: string;
  status: string;
  totalPrice: string;
  estimatedCompletionDate: string;
  orderAdditionalRequests: string;
  services: Service[];
}

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<OrderForm | null>(null);
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
        const order = res.data.order;

        setForm({
          owningCustomer: order.owningCustomer,
          assignedMechanick: order.assignedMechanick,
          status: order.statusname,
          totalPrice: order.totalPrice,
          estimatedCompletionDate: order.orderEstimatedCompletionDate.split('T')[0],
          orderAdditionalRequests: order.orderAdditionalRequests || '',
          services: order.services || [],
        });
      } catch (error) {
        console.error('Failed to fetch order', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, authToken]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    if (!form) return;
     console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleServiceStatus = (index: number) => {
    if (!form) return;
    const updatedServices = [...form.services];
    updatedServices[index].serviceCompleted =
      !updatedServices[index].serviceCompleted;

    setForm({ ...form, services: updatedServices });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    setSaving(true);
    try {
      await instance.put(`/orders/${id}`, {
        status: form.status,
        estimatedCompletionDate: form.estimatedCompletionDate,
        orderAdditionalRequests: form.orderAdditionalRequests,
        services: form.services,
      }
    , {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      navigate('/admin/orders');
    } catch (error) {
      console.error('Failed to update order', error);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return <div className="p-8 text-gray-500">Loading order...</div>;
  }

  if (!form) {
    return <div className="p-8 text-red-500">Order not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-blue-950 mb-6">
        Edit Order #{id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Read-only Info */}
        <div className="grid grid-cols-2 gap-4">
          <Input label="Customer" value={form.owningCustomer} disabled />
          <Input label="Mechanic" value={form.assignedMechanick} disabled />
          <Input label="Total Price" value={form.totalPrice} disabled />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Estimated Completion Date */}
        <Input
          label="Estimated Completion Date"
          type="date"
          name="estimatedCompletionDate"
          value={form.estimatedCompletionDate}
          onChange={handleChange}
        />

        {/* Additional Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Requests
          </label>
          <textarea
            name="orderAdditionalRequests"
            value={form.orderAdditionalRequests}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Services</h3>
          <div className="space-y-2">
            {form.services.map((service, index) => (
              <label
                key={index}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={service.serviceCompleted}
                  onChange={() => toggleServiceStatus(index)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{service.serviceName}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Order'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Reusable Input ---------------- */
function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
