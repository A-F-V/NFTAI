import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import img1 from "../public/images/nft-(27).png";
import img2 from "../public/images/nft-(87).png";
import img3 from "../public/images/nft-(1033).png";
import img4 from "../public/images/nft-(98).png";
import img5 from "../public/images/nft-(149).png";
import img6 from "../public/images/nft-(171).png";

function Cards() {
  return (
    <div className="cards">
      <h1>Check out some of our Cat NFTs!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={img1}
              text="Nice smile"
              label="NFT1"
              path="/services"
            />
            <CardItem
              src={img2}
              text="Turn down for what"
              label="NFT2"
              path="/services"
            />
            <CardItem src={img3} text="Serious" label="NFT3" path="/services" />
          </ul>
          <ul className="cards__items">
            <CardItem src={img4} text="Pirate" label="NFT4" path="/services" />
            <CardItem
              src={img5}
              text="Big eyes"
              label="NFT5"
              path="/products"
            />
            <CardItem
              src={img6}
              text="Funny tail"
              label="NFT6"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
