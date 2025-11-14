import React, { useEffect, useState } from "react";
import './home.css';

function Home() {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
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

  // Count applications for each status
  const getCount = (status) => {
    switch (status) {
      case "Applied":
        return applications.filter(app => app.status === "Applied").length;
      case "Shortlisted":
        return applications.filter(app => app.status === "Approved").length;
      case "Ongoing":
        return applications.filter(app => app.status === "Ongoing").length;
      case "Completed":
        return applications.filter(app => app.status === "Completed").length;
      default:
        return 0;
    }
  };

  // Filter applications for display
  const filteredApplications = (status) => {
    switch (status) {
      case "Applied":
        return applications.filter(app => app.status === "Applied");
      case "Shortlisted":
        return applications.filter(app => app.status === "Approved");
      case "Ongoing":
        return applications.filter(app => app.status === "Ongoing");
      case "Completed":
        return applications.filter(app => app.status === "Completed");
      default:
        return [];
    }
  };

  const handleCardClick = (status) => {
    setSelectedStatus(status);
  };

  if (loading) return <p>Loading stats...</p>;

  return (
    <section>
      {/* If no status selected → Show Stats */}
      {!selectedStatus && (
        <div className="stats-section">
          {["Applied", "Shortlisted", "Ongoing", "Completed"].map((status) => (
            <div
              key={status}
              className={`stat-card ${status === "Applied" || status === "Ongoing" ? "up" : "down"}`}
              onClick={() => handleCardClick(status)}
            >
              <h3>{status}</h3>
              <p>{getCount(status)}</p>
            </div>
          ))}
        </div>
      )}

      {/* If status selected → Show Applications */}
      {selectedStatus && (
        <div className="application-list">
          <h3>{selectedStatus} Applications</h3>
          {filteredApplications(selectedStatus).map((app, i) => (
            <div key={i} className="application-card">
              <strong>Internship:</strong> {app.internshipTitle} <br />
              <strong>Name:</strong> {app.name} <br />
              <strong>Email:</strong> {app.email} <br />
              <strong>Phone:</strong> {app.phone} <br />
              <strong>Resume:</strong>{" "}
              <a href={app.resumeLink} target="_blank" rel="noopener noreferrer">
                {app.resumeLink}
              </a> <br />
              <strong>Status:</strong> {app.status} <br />
              <strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}
            </div>
          ))}

          {filteredApplications(selectedStatus).length === 0 && <p>No applications found.</p>}

          <button onClick={() => setSelectedStatus(null)}>← Back</button>
        </div>
      )}
    </section>
  );
}

export default Home;
