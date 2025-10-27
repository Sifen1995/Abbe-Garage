import { Route,Routes } from "react-router-dom";
import  ProtectedRoute from './components/ProtectedRoute'
import React from 'react'
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import AdminDashboard from "./pages/admin/adminDashboard";
import AddCustomer from "./components/admin/customer/addCustomer";
import AddEmployee from "./components/admin/employee/addEmployee";
import UpdateCustomer from "./components/admin/customer/updateCustomer";

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
   <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          
          <Route path="addcustomer" element={<AddCustomer />} /> 
          <Route path="addemployee" element={<AddEmployee />} /> 
          <Route path="updatecustomer" element={<UpdateCustomer />} /> 
        </Route>
        


      </Routes> 
    </>
  )
}




