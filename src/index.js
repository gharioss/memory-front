import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://memorybackjulie.herokuapp.com/php/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
