import { React, useState, useEffect } from "react";
import { Graph } from "react-d3-graph";

import axios from "axios";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import Terminal from "./Terminal";
import { GraphComponent } from "./GraphComponent";

const TopoViewer = ({ topoData, graphConfig, onClickLink }) => {
  // changes <title> of the tab with respect to the page/components
  useEffect(() => {
    document.title = "Topology Viewer";
  }, []);

  const [count, setCount] = useState(0);
  const [output, setOutput] = useState("Quick command output appears here...");

  /* TERMINAL RELATED METHODS AND STATES */

  const [showTerminal, setShowTerminal] = useState(false);

  const terminal = () => {
    if (showTerminal) {
      return <Terminal onClickCmd={onClickCmd} />;
    } else {
      return (
        <Form style={{ marginTop: "5px", position: "relative" }}>
          <Form.Control as="textarea" rows={7} disabled value={output} />
        </Form>
      );
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
    console.log(nodeID);
    setShowModal(true);
  };

  const onClickCmd = async (cmd) => {
    setShowModal(false);
    setShowLoading(true);
    let result = await axios.post("http://localhost:3001/command", {
      command: cmd,
    });
    await setOutput(result.data);
    setShowLoading(false);
    return result.data;
  };

  const modal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{nodeClicked}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="primary"
              onClick={() => onClickCmd(`${nodeClicked} nfdc status report`)}
            >
              NFD Status
            </Button>

            <Button variant="primary" onClick={() => onClickCmd(`net run`)}>
              Network Status
            </Button>

            <Button
              variant="primary"
              onClick={() => onClickCmd(`${nodeClicked} nlsrc status`)}
            >
              NLSR Status
            </Button>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // SHOW LOADING SCREEN

  const [showLoading, setShowLoading] = useState(true);
  const loadingOverlay = () => {
    return (
      <Modal
        show={showLoading}
        onHide={() => setShowLoading(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Performing operation, please wait awhile...</Modal.Body>
        <ProgressBar animated now={50} />
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  };

  // if (ViewTopo) {
  if (count === 0) {
    setTimeout(() => {
      setShowLoading(false);
      setCount(1);
    }, 30000);
  }
  return (
    <Container style={{ minHeight: "100vh" }}>
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
              <GraphComponent
                topoData={topoData}
                graphConfig={graphConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Container style={{ margin: "10px 0px 10px 0px" }}>
        <Row
          className="mt-1"
          class="text-center"
          style={{ justifyContent: "center", alignContent: "center" }}
        >
          <Col
            className="border-right border-3 border-white"
            style={{ flexGrow: "2" }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setShowTerminal(!showTerminal);
                setShowTable(false);
              }}
              block
            >
              Terminal
            </Button>{" "}
          </Col>

          <Col
            className="border-right border-3 border-white"
            style={{ flexGrow: "2" }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setShowLoading(true);
                axios.get("http://localhost:3001/start");
                setTimeout(() => {
                  setShowLoading(false);
                }, 20000);
              }}
              block
            >
              Start NDN Stack
            </Button>{" "}
          </Col>

          <Col style={{ flexGrow: "2" }}>
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
};

export default TopoViewer;
