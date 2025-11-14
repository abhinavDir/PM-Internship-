import React, { useEffect, useState } from "react";
import "./report.css";

function Reports() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved (shortlisted) applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token"); // Admin token
      const res = await fetch(
        "http://localhost:5000/api/admin/reports/approved-applications",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching approved applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Toggle Completed / Not Completed status
  const toggleStatus = async (appId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "Completed" ? "Not Completed" : "Completed";

      const res = await fetch(
        `http://localhost:5000/api/admin/reports/update-application/${appId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const editApplication = (appId) => {
    alert(`Edit application ID: ${appId}`);
  };

  if (loading) return <p className="loading-text">Loading reports...</p>;

  return (
    <div className="reports-container">
      <h2>Reports & Analytics</h2>
      <p>View all shortlisted (approved) students and their internships.</p>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Internship</th>
            <th>Status</th>
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan="6">No shortlisted students found.</td>
            </tr>
          )}
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.internshipTitle}</td>
              <td>{app.status || "Not Completed"}</td>
              <td>
                <button
                  className="status-btn"
                  onClick={() => toggleStatus(app._id, app.status)}
                >
                  {app.status === "Completed" ? "Mark Incomplete" : "Mark Completed"}
                </button>
              </td>
              <td>
                <button className="edit-btn" onClick={() => editApplication(app._id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
