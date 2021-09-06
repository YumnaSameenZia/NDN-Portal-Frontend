import axios from "axios";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Form, Col } from "react-bootstrap";

const SignUp = ({ setAuthorized }) => {
  // changes <title> of the tab with respect to the page/components
  useEffect(() => {
    document.title = "Login";
  }, []);

  const history = useHistory();

  // Control the state of input fields
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  // HANDLE LOGIN
  // Send the login details to nodejs server if login is verified go to build topology otherwise show error
  const handleLogin = (history) => {
    axios
      .post("http://localhost:3001/persons", loginInput)
      .then((response) => {
        if (response.status === 200) {
          setAuthorized(true);
          history.push("/build");
        } else if (response.status === 204) {
          throw Error("User name or Password incorrect!");
        }
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
            <h1 style={{ fontFamily: "Roboto" }}>Login</h1>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Form className="justify-content-center">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    data-testid="login-form-username"
                    type="text"
                    value={loginInput.username}
                    onChange={(event) => {
                      setLoginInput({
                        username: event.target.value,
                        password: loginInput.password,
                      });
                    }}
                  />
                  <Form.Text className="text-muted">
                    Never share your username or password with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    data-testid="login-form-password"
                    type="password"
                    value={loginInput.password}
                    onChange={(event) => {
                      setLoginInput({
                        username: loginInput.username,
                        password: event.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleLogin(history);
                    }}
                  >
                    Submit
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
