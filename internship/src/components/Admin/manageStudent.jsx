import React, { useState, useEffect } from "react";
import "./manageStudents.css"; // Make sure you have proper CSS for table & modal

function ManageStudents() {
  const [applications, setApplications] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
  });

  // Fetch all student applications from backend
  const fetchApplications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/manageStudents"); // Correct endpoint
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Open edit modal
  const handleEdit = (app) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      email: app.email,
      phone: app.phone,
      resumeLink: app.resumeLink,
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update application
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/manageStudents/${editingApp._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.msg);
      setEditingApp(null);
      fetchApplications();
    } catch (err) {
      console.error(err);
      alert("Failed to update application");
    }
  };

  // Delete application
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/manageStudents/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.msg);
      fetchApplications();
    } catch (err) {
      console.error(err);
      alert("Failed to delete application");
    }
  };

  return (
    <div className="manage-students">
      <h2>Manage Students</h2>

      {applications.length === 0 ? (
        <p>No student applications found.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Student Username</th>
              <th>Internship</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Resume</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.studentUsername}</td>
                <td>{app.internshipTitle}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>
                  <a href={app.resumeLink} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(app)}>Edit</button>
                  <button onClick={() => handleDelete(app._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingApp && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Application</h3>
            <form onSubmit={handleUpdate}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="Resume Link"
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingApp(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageStudents;
