import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import instance from "../../../Api/axios";

export default function AddService() {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { authToken } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log("Submitting:", formData);

      const response = await instance.post(
        "/services",
        {
          name: formData.name,
          description: formData.description // <-- FIXED HERE
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      setSuccess("Service added successfully");
      setFormData({
        name: "",
        description: ""
      });
    } catch (err: any) {
      console.error("Add service error:", err.response?.data || err.message);
      setError(
        err.response?.data?.msg ||
          "Failed to add service. Check input values."
      );
    }
  };

  return (
    <>
      <div className="flex justify-center p-8 bg-gray-50 min-h-[50vh] mt-8">
        <div className="w-full max-w-2xl bg-white p-10 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-[#002060] mb-8 flex items-center">
            Add a new service
            <span className="ml-3 h-1 w-10 bg-red-600"></span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Service Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id="serviceName"
                  placeholder="Service name"
                  className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                />
              </div>

              {/* Service Description */}
              <div className="relative">
                <textarea
                  id="serviceDescription"
                  rows={8}
                  name="description"
                  placeholder="Service description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold uppercase tracking-wider rounded-md shadow-md hover:bg-red-700 transition duration-200"
              >
                ADD SERVICE
              </button>
            </div>

            {error && <p className="text-red-600 mt-4">{error}</p>}
            {success && <p className="text-green-600 mt-4">{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
