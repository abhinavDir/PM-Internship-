import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "./nav.css";

function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // initialize navigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">PM Internship2025</div>

      {/* Desktop / Mobile Menu */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <button onClick={() => navigate("/")}>Home</button>
        </li>
        <li>
          <button onClick={() => navigate("/gallery")}>Gallery</button>
        </li>
        <li>
          <button onClick={() => navigate("/eligible")}>Eligible</button>
        </li>
         <li>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </li>
        <li>
          <button onClick={() => navigate("/login")}>Login</button>
        </li>
      </ul>

      {/* Hamburger toggle for mobile */}
      <div className="nav-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar1;
