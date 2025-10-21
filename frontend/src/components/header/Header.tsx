import React from 'react'
import logo from '../../assets/abe-logo.jpg'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const {isAuthenticated}=useAuth()
  const {logout} =useAuth()
  const navigate=useNavigate()

  const handelLogOut=()=>{
    logout()
    navigate('/login')
  }

  const handelLogIn=()=>{
    navigate('/login')
  }
  return (
    <header className="w-full flex flex-col">
      {/* 🔹 Top info bar */}
      <div className="flex w-full text-white text-sm">
  {/* Left red section */}
  <div className="bg-red-500 flex items-center justify-center px-6 py-1 w-1/4">
    <p>Enjoy the Beso while we fix your car</p>
  </div>

  {/* Right blue section */}
  <div className="bg-blue-900 flex justify-between items-center px-6 py-1 w-full">
    <p>Monday - Saturday 7:00AM • 6:00PM</p>
    <p>
      Call Abe: <span className="font-bold">+251 972 224 717</span>
    </p>
  </div>
</div>


      {/* 🔹 Main header section */}
      <div className="flex justify-between items-center px-6  bg-white shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Abe logo" className="w-[200px] h-auto object-contain **align-middle**" />
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6 font-medium text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Service</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
          </ul>
          {
           isAuthenticated?(<button type='button' className="ml-6 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handelLogOut} >log out</button>):( <button
            type="button"
            className="ml-6 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>)
          }
         
        </div>
      </div>
    </header>
  )
}
