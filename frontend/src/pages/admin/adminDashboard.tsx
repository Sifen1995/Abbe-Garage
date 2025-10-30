import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Sidebar from "../../components/admin/sideBar";


export default function AdminDashboard() {
  return (
    <Layout>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={"Dashboard"} setActiveTab={function (tab: "Dashboard" | "Orders" | "New order" | "Add employee" | "Employees" | "Add customer" | "Customers" | "Services"): void {
          throw new Error("Function not implemented.");
        } } />

        {/* Dynamic content (based on route) */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
