import React from "react";
import { FaHome, FaBook, FaUser, FaSignOutAlt, FaBell, FaClipboardList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./student.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const username = localStorage.getItem("username") || "Student";

  return (
    <div className="dashboard-container">
      {/* Sidebar / Nav */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">PM Internship</h2>
        <ul className="sidebar-links">
          <li><Link to="/dashboard"><FaHome /> Home</Link></li>
          <li><Link to="/dashboard/applications"><FaClipboardList /> My Applications</Link></li>
          <li><Link to="/dashboard/recommended"><FaBook /> Recommended</Link></li>
          <li><Link to="/dashboard/profile"><FaUser /> Profile</Link></li>
          <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {username} 👋</h1>
          <button className="notif-btn"><FaBell /></button>
        </header>

        {/* Outlet content */}
        <div className="outlet-cards">
          <Outlet />
        
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
