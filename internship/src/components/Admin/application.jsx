import React, { useState, useEffect } from "react";
import './a.css';
function ApplicationsReview() {
  const [applications, setApplications] = useState([]);
  const [editingAppId, setEditingAppId] = useState(null);

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/applications"); // Backend route
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Approve application
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/applications/${id}/approve`, {
        method: "PUT",
      });
      const data = await res.json();
      setApplications(prev =>
        prev.map(app => (app._id === id ? { ...app, status: "Approved" } : app))
      );
      alert(data.msg);
      setEditingAppId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to approve application");
    }
  };

  // Reject application
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this application?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/applications/${id}/reject`, {
        method: "PUT",
      });
      const data = await res.json();
      setApplications(prev =>
        prev.map(app => (app._id === id ? { ...app, status: "Rejected" } : app))
      );
      alert(data.msg);
      setEditingAppId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to reject application");
    }
  };

  return (
    <div className="applications-review">
      <h2>Applications Review</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Student Username</th>
              <th>Internship</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Resume</th>
              <th>Applied At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.studentUsername}</td>
                <td>{app.internshipTitle}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>
                  <a href={app.resumeLink} target="_blank" rel="noopener noreferrer">View</a>
                </td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td>{app.status || "Pending"}</td>
                <td>
                  {editingAppId === app._id ? (
                    <>
                      <button onClick={() => handleApprove(app._id)}>Accept</button>
                      <button onClick={() => handleReject(app._id)}>Reject</button>
                      <button onClick={() => setEditingAppId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setEditingAppId(app._id)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApplicationsReview;
