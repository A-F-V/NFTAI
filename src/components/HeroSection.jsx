import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import vid from "../public/videos/blockchain-original.mp4";
function HeroSection() {
  return (
    <div className="hero-container">
      <video src={vid} autoPlay loop muted />
      <h1>NFT Generator Powered by AI</h1>
      <p>Get your new Cat NFT!</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Request NFT
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          Watch Trailer <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
