import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
console.log("BUILDING");
const app = document.getElementById("root");
ReactDOM.render(<App />, app)
  .then(() => {
    console.log("document");
  })
  .catch(() => {
    console.log("error");
  });
