import { Navigate, Route,Routes } from "react-router-dom";
import  ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage";

export default function Routing() {
   const isAuthenticated = !!localStorage.getItem("authToken");
  return (

        <>
      <Routes>

         {/* public routes */}
        <Route path="/login" element={<Login/>}/>
        {/* protected routes */}
         <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

      </Routes> 
    </>
  )
}




