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
import Admin from "./components/admin/dasheboard/admin";
import AllCustomers from "./components/admin/customer/allCustomers";
import AllEmployees from "./components/admin/employee/allEmployee";
import Service from "./components/admin/servicee/service";
import UpdateEmployee from "./components/admin/employee/updateEmployee";

export default function Routing() {
  
  return (

        <>
      <Routes>

         {/* public routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/" element={<HomePage/>}/>
        {/* protected routes */}
        
   <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          
          <Route path="addcustomer" element={<AddCustomer />} /> 
          <Route path="addemployee" element={<AddEmployee />} />           
          <Route path="customers" element={<AllCustomers />}>
          <Route path="updatecustomer" element={<UpdateCustomer/>} />
           </Route>
          <Route path="" element={<Admin/>} /> 
          <Route path="employees" element={<AllEmployees/>}> 
             <Route path="updateemployee" element={<UpdateEmployee/>} />
          </Route>
          <Route path="services" element={<Service/>} />
        </Route>
        


      </Routes> 
    </>
  )
}




