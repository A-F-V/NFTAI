import React from "react";
import "../../App.css";

import MintButton from "../MintButton";
import Tickets from "../Tickets";

export default function Mint() {
  return (
    <div className="mint">
      <h1>Mint</h1>
      <MintButton />
      <Tickets />
    </div>
  );
}
