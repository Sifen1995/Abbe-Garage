import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import type { Vehicle } from "../../types/vehicle";
import instance from "../../Api/axios";

interface VehiclesProps {
  customerId: string | number;
}

export default function VehiclesOfCustomer({ customerId }: VehiclesProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { authToken } = useAuth();

  // Fetch vehicles
  async function fetchVehicles() {
    if (!authToken) {
      setError("Authentication token not found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await instance.get(`/customers/${customerId}/vehicle`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setVehicles(response.data.vehicles || []);
    } catch (error) {
      console.error("Fetch vehicle error:", error);
      setError("Failed to retrieve customer's vehicle data");
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, [authToken, customerId]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-white mt-3 shadow-md rounded-md p-4 text-gray-500">
        Loading vehicles...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-white mt-3 shadow-md rounded-md p-4 text-red-600">
        {error}
      </div>
    );
  }

  // Handle empty state
  if (vehicles.length === 0) {
    return (
      <div className="bg-white mt-3 shadow-md rounded-md p-4 text-gray-500">
        No vehicle found
      </div>
    );
  }

  // Table display
  return (
    <div className="bg-white shadow-md rounded-md overflow-x-auto mt-3">
      <table className="min-w-full border-collapse">
        <thead className="bg-blue-100 text-left text-gray-700">
          <tr>
            <th className="py-3 px-4 font-semibold">ID</th>
            <th className="py-3 px-4 font-semibold">Year</th>
            <th className="py-3 px-4 font-semibold">Make</th>
            <th className="py-3 px-4 font-semibold">Model</th>
            <th className="py-3 px-4 font-semibold">Type</th>
            <th className="py-3 px-4 font-semibold">Mileage</th>
            <th className="py-3 px-4 font-semibold">Tag</th>
            <th className="py-3 px-4 font-semibold">Serial Number</th>
            <th className="py-3 px-4 font-semibold">Color</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr
              key={v.id}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              <td className="py-3 px-4">{v.id}</td>
              <td className="py-3 px-4">{v.vehicleYear}</td>
              <td className="py-3 px-4">{v.vehicleMake}</td>
              <td className="py-3 px-4">{v.vehicleModel}</td>
              <td className="py-3 px-4">{v.vehicleType}</td>
              <td className="py-3 px-4">{v.vehicleMileage.toLocaleString()} km</td>
              <td className="py-3 px-4">{v.vehicleTag}</td>
              <td className="py-3 px-4">{v.vehicleSerialNumber}</td>
              <td className="py-3 px-4">{v.vehicleColor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
