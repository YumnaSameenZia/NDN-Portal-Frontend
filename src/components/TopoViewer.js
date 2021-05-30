import { React, useState } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";
import Terminal from "terminal-in-react";
import { Container, Button, Row, Col, Form, Modal } from "react-bootstrap";

const TopoViewer = ({ data, myConfig, onClickLink, ViewTopo }) => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  /* TERMINAL RELATED METHODS AND STATES */

  const [showTerminal, setShowTerminal] = useState(true);
  const terminal = () => {
    if (showTerminal) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <Terminal
            color="green"
            backgroundColor="black"
            barColor="black"
            style={{
              marginTop: "5px",
              border: "1px solid white",
              fontWeight: "bold",
              fontSize: "1em",
              height: "500px",
            }}
            startState="maximised"
            commands={{
              "open-google": () =>
                window.open("https://www.google.com/", "_blank"),
              popup: () => alert("Terminal in React"),
              showmsg: () => {
                return "Hello World!";
              },
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
      );
    } else {
      return null;
    }
  };

  /* TABLE RELATED METHODS AND STATES */

  const [structure, setStructure] = useState("");
  const handleClick = (structureName) => {
    setShowTerminal(false);
    setShowTable(true);
    setStructure(structureName);
  };
  const [showTable, setShowTable] = useState(false);
  const table = () => {
    if (showTable) {
      return (
        <>
          <Row className="pt-3">
            <Col style={{ border: "3px solid white" }}>
              <strong>{structure} Entry</strong>
            </Col>
            <Col style={{ border: "3px solid white" }}>
              <strong>{structure} Data</strong>
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

  /* QUICK COMMANDS RELATED TO NODES */

  const [nodeClicked, setNodeClicked] = useState("");
  const [showModal, setShowModal] = useState(false);
  const onClickNode = (nodeID) => {
    setNodeClicked(nodeID.toString());
    setShowModal(true);
  };
  const modal = () => {
    return (
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
    );
  };

  // SHOW LOADING SCREEN

  const [showLoading, setShowLoading] = useState(false);
  const loadingOverlay = () => {
    return (
      <Modal
        show={showLoading}
        onHide={() => setShowLoading(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Performing operation, please wait awhile...</Modal.Body>
      </Modal>
    );
  };

  if (ViewTopo) {
    return (
      <Container style={{ height: "100vh" }}>
        {loadingOverlay()}
        {modal()}
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
          <Row className="mt-1" class="text-center">
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowTerminal(true);
                  setShowTable(false);
                }}
                block
              >
                Terminal
              </Button>{" "}
            </Col>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowLoading(true);
                  axios.get("http://localhost:3001/start");
                  setTimeout(() => {
                    setShowLoading(false);
                  }, 10000);
                }}
                block
              >
                Start NDN Stack
              </Button>{" "}
            </Col>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowLoading(true);
                  axios.get("http://localhost:3001/stop");
                  setTimeout(() => {
                    setShowLoading(false);
                  }, 2000);
                }}
                block
              >
                Stop NDN Stack
              </Button>{" "}
            </Col>
          </Row>
          {table()}
        </Container>
        {terminal()}
      </Container>
    );
  } else {
    return null;
  }
};

export default TopoViewer;
