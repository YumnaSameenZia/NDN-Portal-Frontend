import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import ReactFlow from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";

const ReactFlowGraph = ({ elements }) => {
  const onElementClick = (event, element) => {
    console.log(event, element);
  };

  const onNodeContextMenu = (event, node) => {
    console.log(event, node);
  };

  return (
    <div style={{ height: 400 }}>
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        onNodeContextMenu={onNodeContextMenu}
      />
    </div>
  );
};

export default ReactFlowGraph;
