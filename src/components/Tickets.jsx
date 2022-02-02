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

import { useState, useEffect } from "react";
import "./Button.css";
import { ethers } from "ethers";
import axios from "axios";

import { encode, decode } from "js-base64";
import { Base64 } from "js-base64";

function Ticket({ data }) {
  console.log(data);
  if (data !== "")
    return (
      <>
        <div>
          <img
            src={data.toString()}
            width={300}
            style={{ borderRadius: 10, marginTop: 200 }}
          />
        </div>
      </>
    );
  else return <></>;
}

export default function Tickets() {
  //const [tickets, setTickets] = useState([]);
  const [latest_ticket, setLatestTicket] = useState({});
  const [catImg, setCatImg] = useState("");
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    setSigner(signer);
    const contract = new ethers.Contract(
      "0x00CFDd28F23AFbeD7A1cd477BD9fa75ecE7138af",
      contract_data.abi
    );
    contract.connect(provider);
    const filter = contract.filters.PurchasedTicket(signer._address);
    console.log("filter", filter);
    contract.connect(provider).on(filter, (own, tid) => {
      console.log("tid", tid);
      setLatestTicket({ own, tid });
    });
  }, []);

  useEffect(() => {
    if ((latest_ticket.tid !== undefined) & (signer !== null)) {
      //setTickets(tickets.concat(latest_ticket));
      var optionAxios = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      axios
        .post(
          "http://localhost:1337",
          JSON.stringify({
            ticket: latest_ticket.tid.toString(10),
            address: latest_ticket.own.toString(),
          }),
          optionAxios
        )
        .then((res) => {
          let srcValue = "data:image/png;base64," + res.data;
          console.log(srcValue);
          setCatImg(srcValue);
        })
        .catch((err) => {
          console.log("BAD");
        });
    }
  }, [latest_ticket, signer]);

  return <>{catImg == "" ? <></> : <Ticket data={catImg} />}</>;
}
