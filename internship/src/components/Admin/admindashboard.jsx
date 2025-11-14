import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageStudents from "./manageStudent";
import ApplicationsReview from "./application";
import Reports from "./reports";
import './admindashboard.css';

function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalInternships: 0,
    totalInternshipsApplied: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });
  const navigate = useNavigate();

  // Protected route
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "Admin") {
      navigate("/login");
    } else {
      fetchStats();
    }
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok || res.status === 200) {
        setStats({
          totalStudents: data.totalStudents || 0,
          totalInternships: data.totalInternships || 0,
          totalInternshipsApplied: data.totalInternshipsApplied || 0,
          pendingApplications: data.pendingApplications || 0,
          acceptedApplications: data.acceptedApplications || 0,
          rejectedApplications: data.rejectedApplications || 0,
        });
      } else {
        console.error(data.msg || "Failed to fetch stats");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Render page content
  const renderPage = () => {
    switch (activePage) {
      case "manageStudents":
        return <ManageStudents />;
      case "applications":
        return <ApplicationsReview />;
      case "reports":
        return <Reports />;
      case "logout":
        handleLogout();
        return null;
      default:
        return (
          <div className="dashboard-home">
            <h1>Welcome, Admin</h1>
            <div className="stats-section">
              <div className="stat-card">
                <h3>{stats.totalStudents}</h3>
                <p>Total Students</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalInternships}</h3>
                <p>Total Internships </p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalInternshipsApplied}</h3>
                <p>Total Internships Applied </p>
              </div>
              <div className="stat-card">
                <h3>{stats.pendingApplications}</h3>
                <p>Pending Applications</p>
              </div>
              <div className="stat-card">
                <h3>{stats.acceptedApplications}</h3>
                <p>Accepted Applications</p>
              </div>
              <div className="stat-card">
                <h3>{stats.rejectedApplications}</h3>
                <p>Rejected Applications</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <ul className="sidebar-links">
          <li className={activePage === "home" ? "active" : ""} onClick={() => setActivePage("home")}>Dashboard</li>
          <li className={activePage === "manageStudents" ? "active" : ""} onClick={() => setActivePage("manageStudents")}>Manage Students</li>
          <li className={activePage === "applications" ? "active" : ""} onClick={() => setActivePage("applications")}>Applications Review</li>
          <li className={activePage === "reports" ? "active" : ""} onClick={() => setActivePage("reports")}>Reports</li>
          <li className={activePage === "logout" ? "active" : ""} onClick={() => setActivePage("logout")}>Logout</li>
        </ul>
      </div>
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default AdminDashboard;
