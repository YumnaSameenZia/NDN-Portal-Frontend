import React, {useState} from 'react'
import {Graph} from "react-d3-graph"

export const GraphComponent = ({
  setNodeOptions,
  setNodeClicked,
  setShowOption,
  topoData,
  graphConfig,
  onClickLink,
  onClickNode,

}) => {

  const [currentZoom, setCurrentZoom] = useState(100);

  const onDoubleClickNode = function (nodeId, node) {
    setNodeOptions(true);
    setNodeClicked(nodeId);
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
    setCurrentZoom(Math.floor(newZoom * 100));
  };

  return (
    <div style ={{width:"100%"}}>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={topoData}
        onClickNode={onClickNode}
        config={graphConfig}
        onDoubleClickNode={onDoubleClickNode}
        onRightClickNode={onRightClickNode}
        onClickLink={onClickLink}
        onNodePositionChange={onNodePositionChange}
        onZoomChange={onZoomChange}
      />
     
        <h5 style={{color:"black"}}>Current Zoom: { currentZoom }%</h5>
     
    </div>
  );
};
