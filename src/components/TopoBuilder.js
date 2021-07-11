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

const TopoBuilder = ({ topoData, createTopology, myConfig }) => {
  const history = useHistory();

  // STATES
  const [data, setData] = useState(topoData);
  const [makeTopo, setMakeTopo] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  /*
    WELCOME ALERT MESSAGE
  */
  const alertMessage = () => {
    if (showAlert) {
      return (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
          transition
        >
          Welcome!
        </Alert>
      );
    } else {
      return null;
    }
  };

  // FUNCTIONS

  const onClickNode = function (nodeId) {
    console.log(nodeId);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  /*
    ADD NODE HANDLER
  */
  const [nodesNum, setNodesNum] = useState(data.nodes.length);
  const [nodeCordinates, setNodeCordinates] = useState({ x: 20, y: 20 });
  const addNode = () => {
    console.log(
      `Memory: ${nodeConfig.memory}, radius: ${nodeConfig.radius}, cache: ${nodeConfig.cache}, angle: ${nodeConfig.angle}, cpu: ${nodeConfig.cpu}`
    );
    setNodesNum(nodesNum + 1);
    const nodes = data.nodes.concat({
      id: `node${nodesNum}`,
      x: nodeCordinates.x,
      y: nodeCordinates.y,
      memory: nodeConfig.memory,
      radius: nodeConfig.radius,
      cache: nodeConfig.cache,
      angle: nodeConfig.angle,
      cpu: nodeConfig.cpu,
    });
    setData({ nodes: nodes, links: data.links });
    setNodeCordinates({ x: nodeCordinates.x + 5, y: nodeCordinates.y + 10 });
  };

  /*
    ADD NODE MODAL STATES AND FUNCTION 
  */

  const [showNodeModal, setShowNodeModal] = useState(false);
  const [nodeConfig, setNodeConfig] = useState({
    memory: "",
    radius: "",
    cache: "",
    angle: "",
    cpu: "",
  });

  const handleNodeInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    var valid = false;
    switch (name) {
      case "memory":
        valid = value > 0 && value <= 1024 * 1024 ? true : false;
        break;
      case "radius":
        valid = value >= 0 && value <= 1.0 ? true : false;
        break;
      case "cache":
        valid = value > 0 && value <= 1024 * 100 ? true : false;
        break;
      case "angle":
        valid = value >= 0 && value <= 360 ? true : false;
        break;
      case "cpu":
        valid = value >= 0 && value <= 1.0 ? true : false;
        break;
    }
    if (!valid) {
      window.alert(`Invalid ${name} value, please enter correct value.`);
      setNodeConfig({
        ...nodeConfig,
        [name]: "",
      });
    } else {
      setNodeConfig({
        ...nodeConfig,
        [event.target.name]: event.target.value,
      });
    }
  };

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
              name="memory"
              placeholder="in KB's"
              value={nodeConfig.memory}
              onChange={handleNodeInputChange}
            />
          </InputGroup>
          {/* RADIUS INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Radius</InputGroup.Text>
            <FormControl
              name="radius"
              placeholder="<0.0-1.0>"
              value={nodeConfig.radius}
              onChange={handleNodeInputChange}
            />
          </InputGroup>
          {/* CACHE INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Cache</InputGroup.Text>
            <FormControl
              name="cache"
              placeholder="in KB's"
              value={nodeConfig.cache}
              onChange={handleNodeInputChange}
            />
          </InputGroup>
          {/* ANGLE INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Angle</InputGroup.Text>
            <FormControl
              name="angle"
              placeholder="<0-360>"
              value={nodeConfig.angle}
              onChange={handleNodeInputChange}
            />
          </InputGroup>
          {/* CPU INPUT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>CPU</InputGroup.Text>
            <FormControl
              name="cpu"
              placeholder="<0.0-1.0>"
              value={nodeConfig.cpu}
              onChange={handleNodeInputChange}
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
              addNode();
              console.log(nodeConfig);
              setShowNodeModal(false);
              setNodeConfig({
                memory: "",
                radius: "",
                cache: "",
                angle: "",
                cpu: "",
              });
            }}
          >
            Add Node
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /*
    ADD LINK STATES AND HANDLER
  */
  const [linkInput, setLinkInput] = useState({
    sourceInput: "",
    destinationInput: "",
  });
  const addLink = (bandwidth, delay, loss) => {
    const var1 = data.nodes.find((node) => node.id === linkInput.sourceInput);
    const var2 = data.nodes.find(
      (node) => node.id === linkInput.destinationInput
    );
    const var3 = data.links.find(
      (link) =>
        link.source === linkInput.sourceInput &&
        link.target === linkInput.destinationInput
    );
    if (var1 && var2) {
      if (var3) {
        window.alert("Link already exist!");
      } else {
        const links = data.links.concat({
          source: linkInput.sourceInput,
          target: linkInput.destinationInput,
          bandwidth,
          delay,
          loss,
        });
        console.log(links);
        setData({ nodes: data.nodes, links: links });
      }
    } else {
      const string = var1 ? "Second" : "First";
      window.alert(`${string} node does not exist`);
    }
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
};

export default TopoBuilder;
