import React, { useEffect, useState, useRef } from "react";
import './profile.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    skills: "",
    linkedin: "",
    github: "",
    twitter: "",
  });
  const [photo, setPhoto] = useState(null); // photo file
  const [preview, setPreview] = useState(null); // preview URL
  const fileInputRef = useRef(null); // ref for hidden file input

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          skills: data.skills || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          twitter: data.twitter || "",
        });
        if (data.photoUrl) {
          // Ensure photoUrl is a full URL for preview
          const fullPhotoUrl = data.photoUrl.startsWith("http")
            ? data.photoUrl
            : `http://localhost:5000/${data.photoUrl}`; // Assuming backend runs on localhost:5000
          setPreview(fullPhotoUrl);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file)); // preview
    }
  };

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click(); // trigger file input
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (photo) formData.append("photo", photo);

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setUser(data.user);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!user) return <p className="no-user">No user data found.</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar" onClick={handleAvatarClick}>
            {preview ? <img src={preview} alt="avatar" className="avatar-img"/> : user.name[0].toUpperCase()}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            style={{ display: "none" }} // hidden input
          />
          <div className="header-info">
            <h3>{user.name}</h3>
            <p className="username">@{user.username}</p>
            <p className="role">{user.role}</p>
          </div>
        </div>

        {editMode ? (
          <div className="edit-form">
            {Object.keys(form).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
            <div className="buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-details">
            <div className="detail-item"><strong>Name:</strong> {user.name}</div>
            <div className="detail-item"><strong>Phone:</strong> {user.phone}</div>
            <div className="detail-item"><strong>Location:</strong> {user.location}</div>
            <div className="detail-item"><strong>Skills:</strong> {user.skills}</div>
            <div className="detail-item"><strong>LinkedIn:</strong> {user.linkedin}</div>
            <div className="detail-item"><strong>GitHub:</strong> {user.github}</div>
            <div className="detail-item"><strong>Twitter:</strong> {user.twitter}</div>
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
