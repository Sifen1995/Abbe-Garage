import { Route,Routes } from "react-router-dom";
import  ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage";
import Contact from "./pages/contact/Contact";

export default function Routing() {
  
  return (

        <>
      <Routes>

         {/* public routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
        {/* protected routes */}
         <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

      </Routes> 
    </>
  )
}




