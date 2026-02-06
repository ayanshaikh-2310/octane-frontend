import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import Header from "../components/header/Header";

export default function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <SideBar isOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen} />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <Header
          pathname={location.pathname}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
