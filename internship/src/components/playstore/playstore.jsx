import React from "react";
import "./playstore.css";
import AppImage from "../../assets/playstore.jpg"; // Replace with your image

function PlaystorePage() {
  return (
    <div className="playstore-page">
      <a
               href="https://play.google.com/store/apps/details?id=com.pm.internship.app"

        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={AppImage} alt="App Banner" className="app-image" />
      </a>
    </div>
  );
}

export default PlaystorePage;
