// import React from 'react';
// import './Button.css';
// import { Link } from 'react-router-dom';

// export function Button() {
//   return (
//     <Link to='sign-up'>
//       <button className='btn'>Sign Up</button>
//     </Link>
//   );
// }
import contract_data from "../../artifacts/contracts/AICatNFT.sol/AICatNFT.json";
import React from "react";
import "./Button.css";
import { ethers } from "ethers";
const STYLES = ["btn--primary", "btn--outline", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];
async function onClick() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const signer = provider.getSigner();

  console.log(contract_data.abi);

  const contract = new ethers.Contract(
    "0x00CFDd28F23AFbeD7A1cd477BD9fa75ecE7138af",
    contract_data.abi,
    signer
  ).connect(signer);
  const receipt = await contract.purchaseTicket({
    value: ethers.utils.parseEther("0.001"),
  });
}
export default function MintButton({ type, buttonStyle, buttonSize }) {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        Buy a Ticket
      </button>
    </>
  );
}
