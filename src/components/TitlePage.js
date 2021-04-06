import React from "react";
import "../styles/style.css";

const TitlePage = () => {
  return (
    <div className="TitlePage">
      <div id="particles-js"></div>
      <div class="bg">
        <a href="#">
          <h4>WELCOME TO NDN PORTAL</h4>
        </a>
      </div>
      <div class="container">
        <button
          class="btn"
          onClick={() => {
            window.alert("Login Page");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default TitlePage;
