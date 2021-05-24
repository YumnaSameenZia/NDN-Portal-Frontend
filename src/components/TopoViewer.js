import { React, useState } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";
import Terminal from "terminal-in-react";
import { Container, Button, Row, Col, Form, Modal } from "react-bootstrap";

const TopoViewer = ({ data, myConfig, onClickLink, ViewTopo }) => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  const [nodeClicked, setNodeClicked] = useState("");
  const [showModal, setShowModal] = useState(false);
  const onClickNode = (nodeID) => {
    setNodeClicked(nodeID.toString());
    setShowModal(true);
  };

  const [showTable, setShowTable] = useState(true);
  const table = () => {
    if (showTable) {
      return (
        <>
          <Row className="pt-3">
            <Col style={{ border: "3px solid white" }}>
              <strong>CS Entry</strong>
            </Col>
            <Col style={{ border: "3px solid white" }}>
              <strong>CS Data</strong>
            </Col>
          </Row>
          <Row>
            <Col style={{ border: "3px solid white", height: "150px" }}>
              /switch1/video1/v1
            </Col>
            <Col style={{ border: "3px solid white", height: "150px" }}>
              Cached content at Node 1
            </Col>
          </Row>
        </>
      );
    } else {
      return null;
    }
  };

  if (ViewTopo) {
    return (
      <Container style={{ height: "100vh" }}>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{nodeClicked}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Button variant="primary">Command!</Button>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowModal(false);
                setOutput("Output of command!");
              }}
            >
              Click Me!
            </Button>
          </Modal.Footer>
        </Modal>
        <h1 style={{ fontFamily: "Roboto" }}>Topology Viewer</h1>
        <div
          style={{
            border: "2px solid white",
            width: "100%",
            height: "51vh",
            backgroundColor: "white",
          }}
        >
          <Row>
            <Col>
              <div
                style={{
                  border: "2px solid black",
                  width: "100%",
                  height: "50vh",
                  backgroundColor: "white",
                }}
              >
                <Graph
                  id="graph-id" // id is mandatory
                  data={data}
                  config={myConfig}
                  onClickNode={onClickNode}
                  onClickLink={onClickLink}
                />
              </div>
            </Col>
          </Row>
        </div>

        <Container>
          <Row className="mt-1">
            <Col>
              <Button variant="secondary" block>
                Terminal
              </Button>{" "}
            </Col>
            <Col>
              <Button variant="secondary" block>
                CS
              </Button>{" "}
            </Col>
            <Col>
              <Button variant="secondary" block>
                PIT
              </Button>{" "}
            </Col>
            <Col>
              <Button variant="secondary" block>
                FIB
              </Button>{" "}
            </Col>
          </Row>
          {table}
        </Container>

        {/* Writing Command part here */}
        {/* <>
          <Row className="pt-3">
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                disabled
                placeholder="See output here"
                value={output}
              />
              <Form.Control
                type="text"
                className="mt-1"
                placeholder="Write command here"
                value={command}
                onChange={(event) => {
                  setCommand(event.target.value);
                }}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button
                className="mt-1"
                style={{ width: "6em" }}
                onClick={(event) => {
                  axios
                    .post("http://localhost:3001/command", {
                      command: command,
                    })
                    .then((response) => {
                      console.log(response.data);
                      setOutput(response.data);
                    });
                }}
              >
                Run
              </Button>
            </Col>
          </Row>
        </> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <Terminal
            color="green"
            backgroundColor="grey"
            barColor="black"
            style={{
              fontWeight: "bold",
              fontSize: "1em",
              height: "250px",
            }}
            commands={{
              "open-google": () =>
                window.open("https://www.google.com/", "_blank"),
              popup: () => alert("Terminal in React"),
            }}
            descriptions={{
              "open-google": "opens google.com",
              showmsg: "shows a message",
              alert: "alert",
              popup: "alert",
            }}
            msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
          />
        </div>
      </Container>
    );
  } else {
    return null;
  }
};

export default TopoViewer;
