import React, { useState, useEffect } from "react";
import "./recommended.css"; // 🎨 Import the CSS

function Recommended() {
  const [showForm, setShowForm] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
  });
  const [applications, setApplications] = useState([]);

  const internships = [
    { title: "AI/ML Internship", description: "Work on real AI projects with mentors." },
    { title: "Web Development Internship", description: "Build portals for government schemes." },
    { title: "Data Analytics Internship", description: "Analyze PM Internship Scheme data." },
  ];

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/application/student/${username}`);
        const data = await res.json();
        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (username) fetchApplications();
  }, [username]);

  const handleApply = (title) => {
    setSelectedInternship(title);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/application/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentUsername: username, internshipTitle: selectedInternship, ...formData }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.msg);
        setApplications(prev => [...prev, data.application]);
        setShowForm(false);
        setFormData({ name: "", email: "", phone: "", resumeLink: "" });
      } else {
        alert(data.msg || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }
  };

  const isApplied = (title) => applications.some(app => app.internshipTitle === title);

  return (
    <section className="internship-section">
      <h2 className="section-title">🌟 Recommended Internships</h2>
      <div className="internship-grid">
        {internships.map((internship, i) => (
          <div className="internship-card" key={i}>
            <h3>{internship.title}</h3>
            <p>{internship.description}</p>
            <button 
              className={`apply-btn ${isApplied(internship.title) ? "disabled" : ""}`}
              onClick={() => handleApply(internship.title)}
              disabled={isApplied(internship.title)}
            >
              {isApplied(internship.title) ? "✅ Already Applied" : "🚀 Apply Now"}
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Apply for {selectedInternship}</h3>
            <form onSubmit={handleSubmit} className="apply-form">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <input type="text" name="resumeLink" value={formData.resumeLink} onChange={handleChange} placeholder="Resume Link" />
              <div className="form-actions">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

 <section className="my-applications">
  <h2 className="section-title">📂 My Applications ({applications.length})</h2>
  {applications.length === 0 ? (
    <p className="empty-msg">No applications yet.</p>
  ) : (
    <ul className="application-list">
      {applications.map((app, idx) => (
        <li key={idx} className="application-item">
          <strong>{app.internshipTitle}</strong>
          <p>👤 {app.name}</p>
          <p>📧 {app.email}</p>
          <p>📞 {app.phone}</p>
          <p>📎 <a href={app.resumeLink} target="_blank" rel="noreferrer">View Resume</a></p>
          <p>⏰ Applied At: {new Date(app.appliedAt).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )}
</section>


    </section>
  );
}

export default Recommended;
