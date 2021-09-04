import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import { Container, Col, Row } from "react-bootstrap";

const TitlePage = () => {
  // changes <title> of the tab with respect to the page/components
  useEffect(() => {
    document.title = "Itillah Portal";
  }, []);

  return (
    <div className="TitlePage">
      <div id="particles-js"></div>
      <div class="bg">
        <h4 data-testid="portal-name">ITTILAH PORTAL</h4>
      </div>
      <Container>
        <Row style={{ marginRight: "15px", borderRight: "3px solid grey" }}>
          <Col>
            <Link class="btn" to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link class="btn" to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TitlePage;
