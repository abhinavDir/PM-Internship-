import React, { useState, useEffect } from "react";
import './galery.css';
import Image1 from '../../assets/pm1.webp';
import Image2 from '../../assets/pm2.jpeg';
import Image3 from '../../assets/pm33.jpg';
import Image4 from '../../assets/pm4.jpeg';
import Image5 from '../../assets/m1.webp';
import Image6 from '../../assets/m.jpg';
import Image7 from '../../assets/pm4.jpeg';
import Image8 from '../../assets/m6.webp';

const images = [Image1, Image2, Image3, Image4];
const images1 = [Image5, Image6, Image7,Image8];
function SingleSlider() {
  const [current, setCurrent] = useState(0);
    const [currentt, setCurrentt] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
 
    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentt(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide1 = () => setCurrentt(currentt === length - 1 ? 0 : currentt + 1);
  const prevSlide1 = () => setCurrentt(currentt === 0 ? length - 1 : currentt - 1);
  return (
    <div className="slider-container">
      <button className="nav-btn left-btn" onClick={prevSlide}>&lt;</button>

      <div className="slide-wrapper">
        <div className="slide-card">
          <img src={images[current]} alt={`slide ${current}`} />
        </div>
      </div>

      <button className="nav-btn right-btn" onClick={nextSlide}>&gt;</button>
   <button className="nav-btn left-btn" onClick={prevSlide1}>&lt;</button>

      <div className="slide-wrapper">
        <div className="slide-card">
          <img src={images1[currentt]} alt={`slide ${currentt}`} />
        </div>
      </div>

      <button className="nav-btn right-btn" onClick={nextSlide1}>&gt;</button>
    </div>
    
  );
}

export default function GalleryRow() {
  return (
    <div className="gallery-section">
      <h1 className="gallery-heading">Gallery</h1>
      <div className="gallery-row">
        <SingleSlider />
      
      </div>
    </div>
  );
}
