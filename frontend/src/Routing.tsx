import { Route,Routes } from "react-router-dom";
import  ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

export default function Routing() {
  
  return (

        <>
      <Routes>

         {/* public routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        {/* protected routes */}
         <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

      </Routes> 
    </>
  )
}




