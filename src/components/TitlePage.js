import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const TitlePage = () => {
  return (
    <div className="TitlePage">
      <div id="particles-js"></div>
      <div class="bg">
        <h4 data-testid="portal-name">ITTILAH PORTAL</h4>
      </div>
      <div class="container">
        <Link class="btn" to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </div>
      <div className="container">
        <Link class="btn" to="/signup" style={{ textDecoration: "none" }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default TitlePage;
