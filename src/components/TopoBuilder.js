import ModalForm from "./ModalForm";
import NodeTypes from "./NodeTypes";
import { React, useState, useEffect } from "react";
import { Row, Col, Button, Container, Toast, Form } from "react-bootstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "./Notification";
import { useHistory } from "react-router-dom";
import { GraphComponent } from "./GraphComponent";
import axios from "axios";
import customTopoData from "../custom-topology/data.js";
import MessageAlert from "./MessageAlert";

const TopoBuilder = ({
  topoData,
  setTopoData,
  graphConfig,
  createTopology,
}) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errMsg, setErrMsg] = useState(' ');

  // changes <title> of the tab with respect to the page/components
  useEffect(() => {
    document.title = "Topology Builder";
  }, [message]);

  const history = useHistory();
  const [showNodeModel, setShowNodeModel] = useState(false);
  const [nodeConfig, setNodeConfig] = useState({
    memory: "",
    cache: "",
    radius: "",
    angle: "",
    cpu: "",
    name: "",
  });
  const [nodesNum, setNodesNum] = useState(topoData.nodes.length + 2);

  const [nodeCordinates, setNodeCordinates] = useState({
    x: Math.random() * 200,
    y: Math.random() * 200,
  });

  const onChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // appending the file selected using input
    const formData = new FormData();
    formData.append("file", file);
    setVariant("success");
    try {
      // posting data to endpoint /upload
      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "true",
        },
      });

      // server responding with filename and filepath
      const { fileName, filePath } = res.data;
      console.log(fileName, filename);
      setMessage("File Uploaded");
    } catch (err) {
      setVariant("danger");

      // there was an error
      console.log(err);
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        setMessage(err.response.data.msg);
      } else {
        setMessage(err.response.data.msg);
        console.log(err.response.data.msg);
      }
    }
    console.log(customTopoData[0].nodes);
    setTopoData({
      nodes: customTopoData[0].nodes,
      links: customTopoData[0].links,
    });
    setNodesNum(topoData.nodes.length + 2);
    // SHOW ALERT
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    setShowTopologyNotification(false);
  };

  // add node different from custom node
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

    setNodesNum(topoData.nodes.length + 2);
    const nodes = topoData.nodes.concat({
      id: `node${topoData.nodes.length + 1}`,
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

  // add a custom topology
  const addCustomNode = (multiplier, nodeType) => {
    const nodes = topoData.nodes.concat({
      id: nodeConfig.name,
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
        { id: "node3", fx: 163, fy: 341 },
        { id: "node4", fx: 924, fy: 363 },
        { id: "node2", fx: 207, fy: 125 },
        { id: "node1", fx: 893, fy: 105 },
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
        if (!valid){
          setErrMsg(() => "");
        }
        break;
      case "radius":
        valid = value >= 0 && value <= 1.0 ? true : false;
        if (!valid){
          setErrMsg(() => "");
        }
        break;
      case "cache":  
      valid = value > 0 && value <= 1024 * 100 ? true : false;
      if (!valid){
        setErrMsg(() => "");
      }  
      break;
      case "angle":
        valid = value >= 0 && value <= 360 ? true : false;
        if(!valid){
          setErrMsg(() => "");
        }
        break;
      case "cpu":
        valid = value > 0 && value <= 100 ? true : false;
        if(!valid){  
          setErrMsg(() => "");  
        }  
        break;
      case "name":
        // check for duplicates
        const dp = topoData.nodes.filter((tp) => tp.id == value);
        console.log(dp);
        if (dp.length == 0) {
          valid = true;
        } else {
          // duplicate(s) were found
          console.log(dp.length);
          setErrMsg(() => "Node with that name already exists");
        }

        // check for spaces
        if (value.indexOf(" ") >= 0) {
          setErrMsg(() => "Node name cannot contain spaces");
          console.log("Contain Spaces");
          valid = false;
        }

        break;
      default:
        break;
    }
    if (!valid) {
      window.alert(
        `Invalid ${name} value, please enter correct value.\n${errMsg}`
      );
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

  console.log();
  const nodeModalFields = [
    {
      name: "name",
      title: "Name",
      placeHolder: "Enter Custom Node Name",
      inputValue: nodeConfig.name,
      changeHandler: handleNodeInputChange,
      maxLength: 10,
    },
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
    "(3) Zoom in & out using mouse scroll.",
    "(4) Left Click for node properties.",
  ];
  const buildInstructions = instructions.map((instruction, index) => {
    return <p key={index}>{instruction}</p>;
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
  // UPLOADING TOPOLOGY STATES
  const [showTopologyNotification, setShowTopologyNotification] =
    useState(false);
  {
    /************************************************************************/
  }
  return (
    <>
      <MessageAlert message={message} variant={variant} showAlert={showAlert} />
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
              onClickNode={(nodeId, node) => {
                console.log(nodeId, node);
                const message = `Node Configurations: \n 
                CPU: ${node.cpu ? node.cpu * 100 + "%" : "20%"}\n
                Memory: ${node.memory ? node.memory + "Kb" : "1024Kb"}\n
                Cache: ${node.cache ? node.cache + "Kb" : "512Kb"}\n
                Radius: ${node.radius ? node.radius : "0.1"}\n
                Angle: ${node.angle ? node.angle + "degree" : "0 degree"}\n`;
                setLinkToast({ message });
                setShowNotification(true);
              }}
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
        <Row
          style={{ marginTop: "30px", display: "flex", alignContent: "center" }}
        >
          <Col>
            <Button
              variant="light"
              className="btn-lg btn-block"
              onClick={() => createStarTopology(history)}
            >
              Star Topology
            </Button>
          </Col>
          <Col>
            <Button
              variant="light"
              className="btn-lg btn-block"
              onClick={() => createBusTopology(history)}
            >
              Bus Topology
            </Button>
          </Col>
          <Col>
            <Button
              variant="light"
              className="btn-lg btn-block"
              onClick={() => createRingTopology()}
            >
              Ring Topology
            </Button>
          </Col>
          <Col
            style={{
              flexGrow: "1.5",
              borderRight: "3px solid white",
              marginRight: "30px",
              marginLeft: "-30px",
            }}
          >
            <Button
              variant="light"
              className="btn-lg"
              onClick={() => setShowTopologyNotification(true)}
            >
              Upload Topology
            </Button>
          </Col>

          {/************************************************************************/}
          {/************************************************************************/}
          {/* Buttons */}

          <Col>
            <Button
              variant="secondary"
              className="btn-lg btn-block"
              onClick={() => setShowInstructions(true)}
            >
              Instructions
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              className="btn-lg btn-block"
              onClick={() => createTopology(history)}
            >
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
          submitHandler={addCustomNode}
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
            title="Notification"
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
              <div
                className="d-flex"
                style={{ justifyContent: "space-around" }}
              >
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
              <div
                className="d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <Button variant="secondary" onClick={deleteNode}>
                  Delete Node
                </Button>
              </div>
            </Toast.Body>
          </Toast>
          {/************************************************************************/}
          {/************************************************************************/}
          {/* NOTIFICATION */}
          <Notification
            title="Upload Topology"
            show={showTopologyNotification}
            setShow={setShowTopologyNotification}
            message={
              <form onSubmit={onSubmit}>
                <input type="file" id="uploadfile" onChange={onChange} />
                <input
                  type="submit"
                  value="Upload"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            }
          />
        </div>
      </Container>
    </>
  );
};

export default TopoBuilder;
