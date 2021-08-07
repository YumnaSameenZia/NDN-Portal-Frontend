import React from "react";
import { Button } from "react-bootstrap";
import { faEthernet, faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NodeTypes = ({ addNode, setNodeConfig, setShowNodeModal }) => {
  const nodeTypes = {
    "SDN Controller": 5,
    "Simple Node": 1,
    "Intermediate Node": 2,
    "Advanced Node": 4,
    "Custom Node": 1,
  };
  const generateButtons = () => {
    const temp = [];
    for (const property in nodeTypes) {
      temp.push(
        <div key={property} className="text-center">
          <Button
            variant="dark"
            onClick={() => {
              if (property === "Custom Node") {
                setNodeConfig({
                  memory: "",
                  cache: "",
                  radius: "",
                  angle: "",
                  cpu: "",
                });
                setShowNodeModal(true);
              } else {
                addNode(nodeTypes[property], property);
              }
            }}
          >
            <FontAwesomeIcon
              icon={property == "SDN Controller" ? faEthernet : faServer}
            />
          </Button>{" "}
          <br />
          {property}
        </div>
      );
    }
    return temp;
  };
  return (
    <div
      style={{
        border: "2px solid white",
        paddingTop: "15px",
        paddingBottom: "5px",
        justifyContent: "space-around",
        borderRadius: "0px 0px 5px 5px",
      }}
      className="d-flex"
    >
      {generateButtons()}
    </div>
  );
};

export default NodeTypes;
