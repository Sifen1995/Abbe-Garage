import { useState, useEffect } from "react";
import instance from "../../../Api/axios";
import { useAuth } from "../../context/AuthContext";
import { type Customer } from "../../../types/customer";

type AddOrderOneProps = {
  onCustomerSelect: (customer: Customer) => void;
};

const AddOrderOne = ({ onCustomerSelect }: AddOrderOneProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const{authToken}=useAuth()
  const [error, setError] = useState<string | null>(null);

  // Fetch ALL customers once
  useEffect(() => {
    async function fetchCustomers() {
      if (!authToken) {
        setError("Authentication token not found.");
        setCustomers([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await instance.get<{ customers: Customer[] }>("/customers", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setCustomers(response.data.customers ?? []);
      } catch (error) {
        console.error("Fetch Customers Error:", error);
        setError("Failed to retrieve customer list.");
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, [authToken]);

  const normalize = (value: string | number | null | undefined) =>
    (value ?? "").toString().toLowerCase();

  const getFirstName = (fullName: string | null | undefined) => {
    if (!fullName) return "";
    return fullName.split(" ")[0] ?? "";
  };

  const getLastName = (fullName: string | null | undefined) => {
    if (!fullName) return "";
    const [, ...rest] = fullName.split(" ");
    return rest.join(" ").trim();
  };

  // Filter customers locally
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered([]);
      return;
    }

    const term = searchTerm.toLowerCase();

    const results = customers.filter((c) => {
      const firstName = normalize(getFirstName(c.fullName));
      const lastName = normalize(getLastName(c.fullName));
      const email = normalize(c.email);
      const phone = normalize(c.phoneNumber);

      return (
        firstName.includes(term) ||
        lastName.includes(term) ||
        email.includes(term) ||
        phone.includes(term)
      );
    });

    setFiltered(results);
  }, [searchTerm, customers]);

  const headerTextColor = "text-[#1D2B52]";
  const accentColor = "bg-[#FF0000]";
  const buttonColor = "bg-[#FF0000] hover:bg-[#D40000]";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 sm:p-12 font-sans">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 md:p-10 rounded-lg">
        
        {/* Header */}
        <div className={`text-3xl sm:text-4xl font-extrabold ${headerTextColor} mb-8 flex items-center`}>
          Create a new order
          <div className={`w-8 h-1 ml-2 ${accentColor} rounded-full`}></div>
        </div>

        {/* Search Box */}
        <div className="mb-8 shadow-md rounded-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a customer using first name, last name, email address or phone number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-6 pr-12 py-3 text-gray-700 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150"
            />
            {/* Search icon */}
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Add customer button */}
        <button
          onClick={() => console.log("Add new customer modal")}
          className={`px-6 py-3 text-white text-base font-semibold rounded-md uppercase tracking-wide transition duration-200 shadow-lg ${buttonColor}`}
        >
          Add New Customer
        </button>

        {/* Loading message */}
        {loading && (
          <div className="mt-6 text-center text-gray-500">Loading customers...</div>
        )}

        {!loading && error && (
          <div className="mt-6 text-center text-red-500">{error}</div>
        )}

        {/* Display Results */}
        {filtered.length > 0 && (
          <div className="mt-8 border border-gray-200 rounded-md overflow-hidden shadow-sm">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cust) => {
                  const firstName = getFirstName(cust.fullName);
                  const lastName = getLastName(cust.fullName);

                  return (
                  <tr key={cust.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{firstName || "—"}</td>
                    <td className="px-4 py-3">{lastName || "—"}</td>
                    <td className="px-4 py-3">{cust.email}</td>
                    <td className="px-4 py-3">{cust.phoneNumber || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      
                      <button
                        onClick={() => onCustomerSelect(cust)}
                        className="text-gray-600 hover:text-black"
                      >
                        {/* icon same size as image */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 4v16m8-8H4" 
                          />
                        </svg>
                      </button>

                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* When no results */}
        {searchTerm.length > 0 && filtered.length === 0 && !loading && (
          <div className="mt-8 p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 text-center">
            No matching customers found.
          </div>
        )}

      </div>
    </div>
  );
};

export default AddOrderOne;
