import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../../Api/axios';
import { useAuth } from '../../context/AuthContext';
import type { Customer } from '../../../types/customer';

export default function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- Fetch Customer ---------------- */
  useEffect(() => {
    const fetchOrder = async () => {
      if (!authToken) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }

      try {
        const res = await instance.get(`/customers/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const customer: Customer = res.data.customer;

        setForm({
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          status: customer.status,
          createdAt: customer.createdAt,
        });
      } catch (error) {
        console.error('Failed to fetch customer', error);
        setError('Failed to fetch customer.');
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const firstname = form.fullName.split(' ')[0] || '';
    const lastname = form.fullName.split(' ').slice(1).join(' ') || '';
   

    setSaving(true);
    try {
      await instance.put(`/customers/${id}`, {
        firstname: firstname,
        lastname: lastname,
        email: form.email,
        phonenumber: form.phoneNumber,
        status: form.status,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    
    
  );

      navigate('/admin/customers');
    } catch (error) {
      console.error('Failed to update customer', error);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI States ---------------- */
  if (loading) {
    return <div className="p-8 text-gray-500">Loading customer...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!form) {
    return <div className="p-8 text-red-500">Customer not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-blue-950 mb-6">
        Edit Customer #{id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            name="firstName"
            value={form.fullName.split(' ')[0] || ''}
            onChange={handleChange}
          /><></>

          
          <FormInput
            label="Last Name"
            name="lastName"
            value={form.fullName.split(' ').slice(1).join(' ') || ''}
            onChange={handleChange}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <FormInput
            label="Phone Number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />

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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Meta Info */}
        <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">Customer ID:</span> {form.id}
          </p>
          <p>
            <span className="font-medium">Created At:</span>{' '}
            {new Date(form.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/customers')}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Customer'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Reusable Input ---------------- */
function FormInput({
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
