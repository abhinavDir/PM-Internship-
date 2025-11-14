import React from "react";
import { FaCheckCircle, FaBook, FaClock, FaHandsHelping, FaStar, FaLightbulb } from "react-icons/fa";
import "./eligible.css";

function About() {
  // Eligibility cards
  const eligibilityData = [
    { icon: <FaCheckCircle />, title: "Completed Degree", desc: "Applicants must have completed their graduation.", size: "large" },
    { icon: <FaBook />, title: "Knowledge of PM Tools", desc: "Familiarity with tools like Trello, Jira, Asana.", size: "small" },
    { icon: <FaClock />, title: "Availability", desc: "Able to dedicate required hours per week.", size: "medium" },
    { icon: <FaHandsHelping />, title: "Team Collaboration", desc: "Work effectively in a team environment.", size: "small" },
  ];

  // Benefits/Skills cards
  const skillsData = [
    { icon: <FaStar />, title: "Skill Enhancement", desc: "Gain real-world PM experience.", size: "medium" },
    { icon: <FaLightbulb />, title: "Industry Exposure", desc: "Work with mentors and professionals.", size: "large" },
    { icon: <FaCheckCircle />, title: "Certificate", desc: "Receive certificate on completion.", size: "small" },
    { icon: <FaHandsHelping />, title: "Networking", desc: "Connect with industry experts and peers.", size: "medium" },
  ];

  return (
    <div className="about-section-container">
      <h1 className="about-title">Eligibility & Skills for PM Internship</h1>
      <div className="about-grid">
        {/* Eligibility cards */}
        {eligibilityData.map((item, index) => (
          <div className={`about-card eligibility ${item.size} ${index % 2 === 0 ? "up" : "down"}`} key={index}>
            <div className="about-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}

        {/* Skills/Benefits cards */}
        {skillsData.map((item, index) => (
          <div className={`about-card skills ${item.size} ${index % 2 === 0 ? "up" : "down"}`} key={index}>
            <div className="about-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
