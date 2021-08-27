import React, {useState} from 'react'
import {Graph} from "react-d3-graph"

export const GraphComponent = ({
  setNodeOptions,
  setNodeClicked,
  setShowOption,
  data,
  myConfig
}) => {


  const onDoubleClickNode = function (nodeId, node) {
    setNodeOptions(true);
    setNodeClicked(nodeId);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onRightClickNode = (event, nodeId) => {
    event.preventDefault();
    setShowOption(true);
    setNodeClicked(nodeId);
  };

  const onNodePositionChange = function (nodeId, x, y) {
      console.log(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
  };

  const onZoomChange = function (previousZoom, newZoom) {
    console.log(`Zoomed : ${previousZoom}, ${newZoom}`);
  };

  return (
    <div>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={myConfig}
        onDoubleClickNode={onDoubleClickNode}
        onRightClickNode={onRightClickNode}
        onClickLink={onClickLink}
        onNodePositionChange={onNodePositionChange}
        onZoomChange={onZoomChange}
      />
    </div>
  );
};
