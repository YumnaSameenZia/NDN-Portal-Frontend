import React from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Login = ({
  loginInput,
  setLoginInput,
  handleLogin,
  viewBuilder,
  SetViewBuilder,
  ViewTopo,
  ViewLogin,
}) => {
  if (viewBuilder === false && ViewTopo === false && ViewLogin === true) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          // backgroundColor: "#85FFBD",
          // backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
          // background: "#36D1DC" /* fallback for old browsers */,
          // background:
          //   "-webkit-linear-gradient(to right, #5B86E5, #36D1DC)" /* Chrome 10-25, Safari 5.1-6 */,
          // background:
          //   "linear-gradient(to right, #5B86E5, #36D1DC)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        }}
      >
        <Container>
          {/* <h1 className="text-center" style={{ fontFamily: "Roboto" }}>
            NAME DATA NETWORKING(NDN) PORTAL
          </h1> */}
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
                      type="text"
                      placeholder="Enter Username"
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
                      type="password"
                      placeholder="Password"
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
                        handleLogin();
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
  } else {
    return null;
  }
};

export default Login;
