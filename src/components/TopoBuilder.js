import React, { useState } from "react";
import { Graph } from "react-d3-graph";
import { useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Alert,
  Row,
  Col,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";

const TopoBuilder = ({
  data,
  addNode,
  addLink,
  linkInput,
  setLinkInput,
  createTopology,
  myConfig,
  onClickLink,
  onClickNode,
  ViewTopo,
  viewBuilder,
  username,
}) => {
  const history = useHistory();
  const [makeTopo, setMakeTopo] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const alertMessage = () => {
    if (showAlert) {
      return (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
          transition
        >
          Welcome {username}!
        </Alert>
      );
    } else {
      return null;
    }
  };

  /*
    ADD NODE MODAL STATES AND FUNCTION 
  */

  const [showNodeModal, setShowNodeModal] = useState(false);
  const [memory, setMemory] = useState("");
  const [radius, setRadius] = useState("");
  const [cache, setCache] = useState("");
  const [angle, setAngle] = useState("");
  const [cpu, setCpu] = useState("");

  const nodeModal = () => {
    return (
      <Modal
        show={showNodeModal}
        onHide={() => setShowNodeModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* MEMORY INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Memory</InputGroup.Text>
            <FormControl
              placeholder="in KB's"
              value={memory}
              onChange={(event) => {
                setMemory(event.target.value);
              }}
            />
          </InputGroup>
          {/* RADIUS INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Radius</InputGroup.Text>
            <FormControl
              placeholder="<0.0-1.0>"
              value={radius}
              onChange={(event) => {
                setRadius(event.target.value);
              }}
            />
          </InputGroup>
          {/* CACHE INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Cache</InputGroup.Text>
            <FormControl
              placeholder="in KB's"
              value={cache}
              onChange={(event) => {
                setCache(event.target.value);
              }}
            />
          </InputGroup>
          {/* ANGLE INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Angle</InputGroup.Text>
            <FormControl
              placeholder="<0-360>"
              value={angle}
              onChange={(event) => {
                setAngle(event.target.value);
              }}
            />
          </InputGroup>
          {/* CPU INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>CPU</InputGroup.Text>
            <FormControl
              placeholder="<0.0-1.0>"
              value={cpu}
              onChange={(event) => {
                setCpu(event.target.value);
              }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNodeModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addNode(memory, radius, cache, angle, cpu);
              setShowNodeModal(false);
              setAngle("");
              setCache("");
              setCpu("");
              setMemory("");
              setRadius("");
            }}
          >
            Add Node
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /*
    ADD LINK MODAL STATES AND FUNCTION 
  */

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [bandwidth, setBandwidth] = useState("");
  const [delay, setDelay] = useState("");
  const [loss, setLoss] = useState("");

  const linkModal = () => {
    return (
      <Modal
        show={showLinkModal}
        onHide={() => setShowLinkModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* MEMORY INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Bandwidth</InputGroup.Text>
            <FormControl
              placeholder="1-1000 Mbps"
              value={bandwidth}
              onChange={(event) => {
                setBandwidth(event.target.value);
              }}
            />
          </InputGroup>
          {/* RADIUS INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Delay</InputGroup.Text>
            <FormControl
              placeholder="0-1000ms"
              value={delay}
              onChange={(event) => {
                setDelay(event.target.value);
              }}
            />
          </InputGroup>
          {/* CACHE INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Loss</InputGroup.Text>
            <FormControl
              placeholder="in KB's"
              value={loss}
              onChange={(event) => {
                setLoss(event.target.value);
              }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLinkModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addLink(bandwidth, delay, loss);
              setShowNodeModal(false);
              setBandwidth("");
              setDelay("");
              setLoss("");
            }}
          >
            Add Link
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  /************************************************************************************/

  /*
    ADD LINK STATES AND FUNCTIONS
   */

  if (viewBuilder === true) {
    return (
      <Container>
        {alertMessage()}
        {nodeModal()}
        {linkModal()}
        <h1 style={{ fontFamily: "Roboto", paddingTop: "20px" }}>TOPOLOGY</h1>
        <Row style={makeTopo ? {} : { height: "85vh" }}>
          <Col>
            <Button
              variant="secondary"
              block
              onClick={() => setMakeTopo(true)}
              data-testid="create-topology-button"
            >
              Create Topology
            </Button>{" "}
          </Col>
          <Col>
            <Button
              variant="secondary"
              block
              onClick={() => createTopology(history)}
              data-testid="view-topology-button"
            >
              View Topology
            </Button>{" "}
          </Col>
        </Row>
        <br></br>
        <Row className={makeTopo ? "" : "d-none"}>
          <Col className="justify-content-right">
            <br></br>
            <br></br>
            <br></br>
            <Button
              variant="secondary"
              onClick={() => setShowNodeModal(true)}
              block
            >
              Add Node
            </Button>{" "}
            <br></br>
            <InputGroup className="">
              <FormControl
                aria-label="Source Node"
                aria-describedby="basic-addon1"
                value={linkInput.sourceInput}
                placeholder="Source Node"
                onChange={(event) => {
                  setLinkInput({
                    sourceInput: event.target.value,
                    destinationInput: linkInput.destinationInput,
                  });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <FormControl
                aria-label="Destination Node"
                aria-describedby="basic-addon1"
                value={linkInput.destinationInput}
                placeholder="Destination Node"
                onChange={(event) => {
                  setLinkInput({
                    destinationInput: event.target.value,
                    sourceInput: linkInput.sourceInput,
                  });
                }}
              />
            </InputGroup>
            <Button
              variant="secondary"
              onClick={() => setShowLinkModal(true)}
              block
            >
              Add Link
            </Button>{" "}
            <br></br>
            <br></br>
            <br></br>
            <Button
              variant="secondary"
              onClick={() => createTopology(history)}
              block
            >
              Submit
            </Button>{" "}
            {/* <Button variant="secondary" block>
              Delete
            </Button>
            <Button variant="secondary" block>
              Go Back
            </Button>{" "} */}
          </Col>
          <Col>
            <div
              style={{
                border: "2px solid black",
                width: "100%",
                height: "80vh",
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
      </Container>
    );
  } else {
    return null;
  }
};

export default TopoBuilder;
