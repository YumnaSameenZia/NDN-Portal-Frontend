import ModalForm from "./ModalForm";
import NodeTypes from "./NodeTypes";
import { Graph } from "react-d3-graph";
import { React, useState, useEffect } from "react";
import { Row, Col, Button, Container, Toast } from "react-bootstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "./Notification";
import { useHistory, Link } from "react-router-dom";
import { GraphComponent } from "./GraphComponent";

const TopoBuilder = ({
  topoData,
  setTopoData,
  graphConfig,
  createTopology,
}) => {
  // changes <title> of the tab with respect to the page/components
  useEffect(() => {
    document.title = "Topology Builder";
  }, []);

  const history = useHistory();
  const [showNodeModel, setShowNodeModel] = useState(false);
  const [nodeConfig, setNodeConfig] = useState({
    memory: "",
    cache: "",
    radius: "",
    angle: "",
    cpu: "",
  });
  const [nodesNum, setNodesNum] = useState(topoData.nodes.length);
  const [nodeCordinates, setNodeCordinates] = useState({
    x: Math.random() * 200,
    y: Math.random() * 200,
  });
  const addNode = (multiplier, nodeType) => {
    if (nodeType !== "Custom Node") {
      setNodeConfig({
        memory: 1024 * multiplier,
        cache: 512 * multiplier,
        angle: 0.0,
        radius: 0.0,
        cpu: 10 * multiplier,
      });
    }
    setNodesNum(nodesNum + 1);
    const nodes = topoData.nodes.concat({
      id: `node${nodesNum}`,
      x: nodeCordinates.x,
      y: nodeCordinates.y,
      memory: nodeConfig.memory,
      radius: nodeConfig.radius,
      cache: nodeConfig.cache,
      angle: nodeConfig.angle,
      cpu: nodeConfig.cpu / 100,
    });
    setTopoData({ nodes: nodes, links: topoData.links });
    setNodeCordinates({ x: Math.random() * 200, y: Math.random() * 200 });
  };

  // create a sdn topology
  const createSdnTopology = () => {
    const sdn = {
      nodes: [
        { id: "node1", x: 358, y: 190 },
        { id: "node2", x: 314, y: 346 },
        { id: "node3", x: 397, y: 493 },
        { id: "node4", x: 178, y: 304 },
        { id: "s", x: 211, y: 449 },
      ],
      links: [
        { source: "s", target: "node1" },
        { source: "s", target: "node2" },
        { source: "s", target: "node3" },
        { source: "s", target: "node4" },
      ],
    };
    setTopoData({ nodes: sdn.nodes, links: sdn.links });
    setNodeCordinates({ x: Math.random() * 200, y: Math.random() * 200 });
  };

  // create bus topology
  const createBusTopology = () => {
    const bus = {
      nodes: [
        { id: "node1", x: 133, y: 192 },
        { id: "node2", x: 224, y: 131 },
        { id: "node3", x: 478, y: 359 },
        { id: "node4", x: 323, y: 463 },
        { id: "node5", x: 151, y: 104 },
      ],
      links: [
        { source: "node1", target: "node2" },
        { source: "node2", target: "node3" },
        { source: "node3", target: "node4" },
        { source: "node4", target: "node5" },
      ],
    };

    setTopoData({ nodes: bus.nodes, links: bus.links });
    setNodeCordinates({ x: Math.random() * 200, y: Math.random() * 200 });
  };

  // create a star topology
  const createStarTopology = () => {
    const star = {
      nodes: [
        { id: "node1", x: 358, y: 190 },
        { id: "node2", x: 314, y: 346 },
        { id: "node3", x: 397, y: 493 },
        { id: "node4", x: 178, y: 304 },
        { id: "node5", x: 211, y: 449 },
      ],
      links: [
        { source: "node5", target: "node1" },
        { source: "node5", target: "node2" },
        { source: "node5", target: "node3" },
        { source: "node5", target: "node4" },
      ],
    };

    setTopoData({ nodes: star.nodes, links: star.links });
    setNodeCordinates({ x: Math.random() * 200, y: Math.random() * 200 });
  };

  // create a ring topology
  const createRingTopology = () => {
    const ring = {
      nodes: [
        { id: "node1", x: 100, y: 100 },
        { id: "node2", x: 200, y: 200 },
        { id: "node3", x: 300, y: 200 },
        { id: "node4", x: 500, y: 200 },
      ],
      links: [
        { source: "node1", target: "node4" },
        { source: "node1", target: "node2" },
        { source: "node2", target: "node1" },
        { source: "node2", target: "node3" },
        { source: "node3", target: "node4" },
        { source: "node3", target: "node2" },
        { source: "node4", target: "node1" },
        { source: "node4", target: "node3" },
      ],
    };

    setTopoData({ nodes: ring.nodes, links: ring.links });
    setNodeCordinates({ x: Math.random() * 200, y: Math.random() * 200 });
  };

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
        valid = value > 0 && value <= 100 ? true : false;
        break;
      default:
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

  const nodeModalFields = [
    {
      name: "memory",
      title: "Memory",
      placeHolder: "in KB's",
      inputValue: nodeConfig.memory,
      changeHandler: handleNodeInputChange,
    },
    {
      name: "cache",
      title: "Cache",
      placeHolder: "in KB's",
      inputValue: nodeConfig.cache,
      changeHandler: handleNodeInputChange,
    },
    {
      name: "radius",
      title: "Radius",
      placeHolder: "<0.0-1.0>",
      inputValue: nodeConfig.radius,
      changeHandler: handleNodeInputChange,
    },
    {
      name: "angle",
      title: "Angle",
      placeHolder: "<0-360>",
      inputValue: nodeConfig.angle,
      changeHandler: handleNodeInputChange,
    },
    {
      name: "cpu",
      title: "CPU",
      placeHolder: "<0-100%>",
      inputValue: nodeConfig.cpu,
      changeHandler: handleNodeInputChange,
    },
  ];

  {
    /************************************************************************/
  }
  {
    /* CONFIGURATION TO ADD LINK */
  }
  const [link, setLink] = useState({ source: "", target: "" });
  useEffect(() => {
    if (link.source === "" && link.target !== "") {
      setLinkToast({
        message: "Set Source Node",
      });
      setShowNotification(true);
    } else if (link.target === "" && link.source !== "") {
      setLinkToast({
        message: "Set Target Node",
      });
      setShowNotification(true);
    } else if (
      link.source === link.target &&
      link.source !== "" &&
      link.target !== ""
    ) {
      setLinkToast({
        message: "Source and Target Node cannot be same",
      });
      setShowNotification(true);
    } else if (
      link.source !== "" &&
      link.target !== "" &&
      link.source !== link.target
    ) {
      setLinkToast({
        message: "Adding Link",
      });
      var temp = topoData.links;
      temp.push(link);
      setTopoData({
        ...topoData,
        links: temp,
      });
      setLink({
        source: "",
        target: "",
      });
      setShowNotification(false);
    }
  }, [link]);
  const [nodeClicked, setNodeClicked] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [linkToast, setLinkToast] = useState({
    duration: 0,
    message: "",
  });

  const addSource = () => {
    setLink({
      ...link,
      source: nodeClicked,
    });
    setShowOption(false);
  };

  const addDestination = () => {
    setLink({
      ...link,
      target: nodeClicked,
    });
    setShowOption(false);
  };
  {
    /************************************************************************/
  }
  {
    // INSTRUCTIONS
  }
  const instructions = [
    "(1) Right click on node to add Link.",
    "(2) Double Click on Node to delete it.",
    "(3) Zoom in & out using mouse scroll",
  ];
  const buildInstructions = instructions.map((instruction) => {
    return <p>{instruction}</p>;
  });
  {
    /************************************************************************/
  }
  {
    // DELETING NODES
  }
  const [nodeOptions, setNodeOptions] = useState(false);

  const deleteNode = () => {
    //   //also need to remove the links too
    //   var tempLinks = topoData.links;
    //   tempLinks = tempLinks.filter(
    //     (link) => link.source !== nodeClicked || link.target !== nodeClicked
    //   );
    //   var temp = topoData.nodes;
    //   temp = temp.filter((node) => node.id !== nodeClicked);
    //   setTopoData({
    //     links: tempLinks,
    //     nodes: temp,
    //   });
    var links = topoData.links;
    var nodes = topoData.nodes;

    links = links.filter(
      (link) => link.source !== nodeClicked && link.target !== nodeClicked
    );
    nodes = nodes.filter((node) => node.id !== nodeClicked);

    setTopoData({
      nodes: nodes,
      links: links,
    });

    setNodeOptions(false);
    console.log("Deleted Node!");
  };

  {
    /************************************************************************/
  }
  return (
    <Container
      className="text-center"
      style={{ minHeight: "100vh", backgroundColor: "black" }}
    >
      {/************************************************************************/}
      {/* MAIN HEADING */}
      <h1 style={{ fontFamily: "Roboto" }}>
        <span>
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>{" "}
        </span>
        Build Topology
      </h1>
      {/************************************************************************/}
      {/************************************************************************/}
      {/* GRAPH COMPONENT */}
      <Row>
        <Col style={{ backgroundColor: "white" }}>
          <GraphComponent
            setNodeOptions={setNodeOptions}
            setNodeClicked={setNodeClicked}
            topoData={topoData}
            graphConfig={graphConfig}
            setShowOption={setShowOption}
          />
        </Col>
      </Row>
      {/************************************************************************/}
      {/************************************************************************/}
      {/* GENERATE BUTTONS */}
      <Row>
        <Col style={{ padding: "0px" }}>
          <NodeTypes
            addNode={addNode}
            setNodeConfig={setNodeConfig}
            setShowNodeModal={setShowNodeModel}
            createSdnTopology={createSdnTopology}
          ></NodeTypes>
        </Col>
      </Row>
      {/************************************************************************/}
      {/************************************************************************/}
      {/* prebuild topologies */}
      <Row>
        <h3
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}
        >
          Prebuilt Topologies
        </h3>
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <Col>
          <Button variant="dark" onClick={() => createStarTopology(history)}>
            Star Topology
          </Button>
        </Col>
        <Col>
          <Button variant="dark" onClick={() => createBusTopology(history)}>
            Bus Topology
          </Button>
        </Col>
        <Col>
          <Button variant="dark" onClick={() => createRingTopology()}>
            Ring Topology
          </Button>
        </Col>
      </Row>
      {/************************************************************************/}
      {/************************************************************************/}
      {/* Buttons */}
      <Row style={{ marginTop: "25px" }}>
        <Col>
          <Button variant="dark" onClick={() => setShowInstructions(true)}>
            Instructions
          </Button>
        </Col>
        <Col>
          <Button variant="dark" onClick={() => createTopology(history)}>
            Submit
          </Button>
        </Col>
      </Row>
      {/************************************************************************/}
      {/************************************************************************/}
      {/* NODE MODAL */}
      <ModalForm
        title="Add Node"
        config={nodeConfig}
        fields={nodeModalFields}
        showModal={showNodeModel}
        setShowModal={setShowNodeModel}
        submitHandler={addNode}
      />
      {/************************************************************************/}
      {/************************************************************************/}
      {/* INSTRUCTIONS */}
      <div style={{ position: "fixed", top: "0px", right: "14px" }}>
        <Notification
          title="Instructions"
          show={showInstructions}
          setShow={setShowInstructions}
          message={buildInstructions}
        />
        {/************************************************************************/}
        {/************************************************************************/}
        {/* NOTIFICATION */}
        <Notification
          title="Adding Link"
          show={showNotification}
          setShow={setShowNotification}
          message={linkToast.message}
        />
        {/************************************************************************/}
        {/************************************************************************/}
        {/* ADD LINK */}
        <Toast show={showOption} onClose={() => setShowOption(false)}>
          <Toast.Header>
            <strong className="me-auto block">Link Options</strong>
          </Toast.Header>
          <Toast.Body className="text-left text-white bg-dark">
            Select the node as link source or destination
            <hr></hr>
            <div className="d-flex" style={{ justifyContent: "space-around" }}>
              <Button variant="secondary" onClick={addSource}>
                Source
              </Button>
              <Button variant="secondary" onClick={addDestination}>
                Destination
              </Button>
            </div>
          </Toast.Body>
        </Toast>
        {/************************************************************************/}
        {/************************************************************************/}
        {/* DELETE NODE */}
        <Toast show={nodeOptions} onClose={() => setNodeOptions(false)}>
          <Toast.Header>
            <strong className="me-auto block">Node Options</strong>
          </Toast.Header>
          <Toast.Body className="text-left text-white bg-dark">
            <div className="d-flex" style={{ justifyContent: "space-around" }}>
              <Button variant="secondary" onClick={deleteNode}>
                Delete Node
              </Button>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

export default TopoBuilder;
