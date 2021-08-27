import React from 'react'
import {Graph} from "react-d3-graph"

export const GraphComponent = ({
  setNodeOptions,
  setNodeClicked,
  topoData,
  graphConfig,
  setShowOption,
}) => {
  const onClickNode = (nodeId, node) => {
    window.alert(`Clicked node ${nodeId} in position (${node.x}, ${node.y})`);
    
    console.log(nodeId);
  };

  const onDoubleClickNode = function (nodeId, node) {
    // setNodeOptions(true);
    // setNodeClicked(nodeId);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onRightClickNode = (event, nodeId) => {
    event.preventDefault();
    setShowOption(true);
    setNodeClicked(nodeId);
  };

  const onRightClickLink = function (event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
  };

  const onNodePositionChange = function (nodeId, x, y) {
      window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
      console.log(nodeId);
  };


  // Callback that's called whenever the graph is zoomed in/out
  // @param {number} previousZoom the previous graph zoom
  // @param {number} newZoom the new graph zoom
  const onZoomChange = function (previousZoom, newZoom) {
    window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
  };

  return (
    <div>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={topoData}
        config={graphConfig}
        onClickNode={onClickNode}
        onDoubleClickNode={onDoubleClickNode}
        onRightClickNode={onRightClickNode}
        onClickLink={onClickLink}
        onRightClickLink={onRightClickLink}
        onNodePositionChange={onNodePositionChange}
        onZoomChange={onZoomChange}
      />
    </div>
  );
};
