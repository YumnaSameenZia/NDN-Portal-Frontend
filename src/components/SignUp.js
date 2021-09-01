import axios from "axios";
import { React, useState, useEffect } from "react";
import { Container, Button, Row, Form, Col } from "react-bootstrap";
import {
  Redirect,
} from "react-router-dom";

const SignUp = ({ setAuthorized }) => {
  // changes <title> of the tab with respect to the page/components
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSignUp = () => {
    alert("New Added User");
    console.log(user.username, user.password);
    let newUser = { username: user.username, password: user.password };
    // create a new json object and place it in the file
    console.log(newUser);
    // sending data to node js for adding in the user.json file
    axios
      .post("http://localhost:3001/signup", newUser)
      .then((response) => {
        // redirect to same page with empty text fields
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container>
        <div style={{ border: "2px solid black", padding: "5px" }}>
          <Row className="justify-content-center">
            <h1 style={{ fontFamily: "Roboto" }}>Sign Up</h1>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Form className="justify-content-center">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>New Username</Form.Label>
                  <Form.Control
                    value={user.username}
                    onChange={(event) => {
                      setUser({
                        username: event.target.value,
                        password: user.password,
                      });
                    }}
                    data-testid="login-form-username"
                    type="text"
                  />
                  <Form.Text className="text-muted">
                    Never share your username or password with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    value={user.password}
                    onChange={(event) => {
                      setUser({
                        username: user.username,
                        password: event.target.value,
                      });
                    }}
                    data-testid="login-form-password"
                    type="password"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="primary"
                    style={{ width: "150px" }}
                    onClick={() => {
                      handleSignUp();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
