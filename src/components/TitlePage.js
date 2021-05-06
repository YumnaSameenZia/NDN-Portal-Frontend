import React from "react";
import "../styles/style.css";

const TitlePage = ({ ViewTitlePage, ViewLoginForm }) => {
  if (ViewTitlePage) {
    return (
      <div className="TitlePage">
        <div id="particles-js"></div>
        <div class="bg">
          <h4 data-testid="portal-name">ITTILAH PORTAL</h4>
        </div>
        <div class="container">
          <button
            class="btn"
            onClick={() => {
              ViewLoginForm();
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TitlePage;
