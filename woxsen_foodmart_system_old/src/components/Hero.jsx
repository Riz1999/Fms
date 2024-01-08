import React from "react";
import "./hero.css";
import playButton from "./play-circle.svg";
import img1 from "./woxsen3.jpg"
const Hero = () => {
  return (
    <section className="hero">
        <img src={img1} alt="Background Image" className="hero__image"/>
    <div className="hero__content">
    <h1>Envirofeast: Fostering Sustainable Dining</h1>
  </div>
    </section>
  );
};

export default Hero;
