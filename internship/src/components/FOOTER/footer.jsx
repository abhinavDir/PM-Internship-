import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-section about">
          <h3>PM Internship 2025</h3>
          <p>
            A platform for students to explore internship opportunities, enhance skills, and connect with mentors.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#eligible">Eligible</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="/playstore">Download App</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: support@pminternship.com</p>
          <p>Phone: +91 1234567890</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} PM Internship Scheme. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
