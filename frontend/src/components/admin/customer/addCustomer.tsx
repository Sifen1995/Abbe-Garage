import React, { useState } from "react";
import instance from "../../../Api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    status: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { authToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log("Submitting:", formData);

      const response = await instance.post(
        "/customers",
        {
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          phonenumber: formData.phonenumber,
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

     
      setSuccess("Customer added successfully!");
      setFormData({
        email: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        status: "",
      });
    } catch (err: any) {
      console.error("Add customer error:", err.response?.data || err.message);
      setError(
        err.response?.data?.msg || "Failed to add customer. Check input values."
      );
    }
  };

  return (
    <div className="ml-[10%] flex flex-col mt-[8%]">
      <h2 className="text-[42px] text-blue-950 mb-6 font-bold">
        Add a new customer
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="text"
            name="email"
            placeholder="Customer Email"
            value={formData.email}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 bg-white"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="firstname"
            placeholder="Customer First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="lastname"
            placeholder="Customer Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="phonenumber"
            placeholder="Customer phone (+25173665309)"
            value={formData.phonenumber}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />
        </div>

        <div className="mb-8">
          <input
            type="text"
            name="status"
            placeholder="Customer Status"
            value={formData.status}
            onChange={handleChange}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />
        </div>

        <button
          className="w-1/6 bg-red-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium"
          type="submit"
        >
          Add Customer
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </form>
    </div>
  );
}
