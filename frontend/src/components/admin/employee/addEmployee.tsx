import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import instance from '../../../Api/axios';



export default function AddEmployee() {

  const [formData, setFormData] = useState({
      email: "",
      firstname: "",
      lastname: "",
      password:"",
      role:"",
      phonenumber: "",
      
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { authToken } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


       const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log("Submitting:", formData);

     
console.log("Headers:", { Authorization: `Bearer ${authToken}` });


      const response = await instance.post(
        "/employees",
        {
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          phonenumber: formData.phonenumber,
          password:formData.password,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Response:", response.data);
      setSuccess("Customer added successfully!");
      setFormData({
        email: "",
        firstname: "",
        lastname: "",
        password:"",
        phonenumber: "",
        role: "",
      });
    } catch (err: any) {
      console.error("Add employee error:", err.response?.data || err.message);
      setError(
        err.response?.data?.msg || "Failed to add employee. Check input values."
      );
    }
  };
  return (
    <>
       <div className='ml-[10%] flex flex-col mt-[8%]'>
        <h2 className='text-[42px] text-blue-950 mb-6 font-bold'>Add a new employee </h2>
        <form action="post" onSubmit={handleSubmit}>
            <div className='mb-6'>
                <input type="text" name='email' placeholder='Employee Email' onChange={handleChange} value={formData.email} className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 bg-white" />
            </div>
            <div className='mb-6'>
                <input type="text" name='firstname' placeholder='Employee First Name' onChange={handleChange} value={formData.firstname} className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>
            <div className='mb-6'>
                 <input type="text" name='lastname' placeholder='Employee Last Name' onChange={handleChange} value={formData.lastname} className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>

             <div className='mb-6'>
                 <input type="text" name='phonenumber' placeholder='Employee phone(+25173665309)'onChange={handleChange} value={formData.phonenumber} className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>

            <div className="mb-6">
  <select
    name="role" onChange={handleChange} value={formData.role}
    className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
  >
    <option value="">Select Employee Role</option>
    <option value="Admin">Admin</option>
    <option value="Employee">Technician</option>
    <option value="Manager">Manager</option>
  </select>
</div>


            <div className='mb-6'>
                 <input type="text" name='password' placeholder='Employee password' onChange={handleChange} value={formData.password} className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200" />
            </div>

            <button className="w-1/6 bg-red-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium" type='submit'>
                Add Employee
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
        </form>
      </div> 
    </>
  )
}
