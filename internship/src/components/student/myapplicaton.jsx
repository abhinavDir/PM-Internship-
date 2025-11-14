import React, { useEffect, useState } from "react";
import "./application.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/application/student/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchApplications();
  }, [username]);

  if (loading) return <p className="loading">Loading applications...</p>;
  if (applications.length === 0) return <p className="no-applications">You have not applied for any internships yet.</p>;

  const getStatusClass = (status) => {
    switch(status) {
      case "Applied": return "status-applied";
      case "Approved": return "status-approved";
      case "Ongoing": return "status-ongoing";
      case "Completed": return "status-completed";
      default: return "";
    }
  }

  return (
    <section className="my-applications">
      <h2>My Applications</h2>
      <div className="application-list">
        {applications.map((app, index) => (
          <div key={index} className="application-item">
            <div className="card-header">
              <h3>{app.internshipTitle}</h3>
              <span className={`status-badge ${getStatusClass(app.status)}`}>{app.status}</span>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Resume:</strong> <a href={app.resumeLink} target="_blank" rel="noopener noreferrer">View</a></p>
              <p className="applied-date"><strong>Applied:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyApplications;
