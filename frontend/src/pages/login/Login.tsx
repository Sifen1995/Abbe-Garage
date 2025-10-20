import React from 'react'
import Layout from '../../components/layout/Layout'

export default function Login() {
  return (
    <Layout>
      <div className='p-[6.3%] ml-[50px]' >
        <header className='mb-10'>
            <h1 className='font-semibold text-[35px] '>Log In To Your Account</h1>
        </header>
       <form >
  
  <div className="mb-10">
    <input
      type="text"
      name="email"
      placeholder="Email"
      className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
    />
  </div>

  <div className="mb-10">
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
    />
  </div>

  <button
    type="button"
    className="w-1/6 bg-red-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium"
  >
    Log In
  </button>

 
</form>

      </div>
    </Layout>
  )
}
