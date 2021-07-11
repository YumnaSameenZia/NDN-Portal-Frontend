import React, { useState } from "react";
import Login from "./Login";
import TopoBuilder from "./TopoBuilder";
import TopoViewer from "./TopoViewer";
import axios from "axios";
import TitlePage from "./TitlePage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ParticleComponent from "./ParticleComponent";

function App() {
  // TOPOLOGY CONFIGURATION
  const [data, setData] = useState({
    nodes: [{ id: "node0" }, { id: "node1" }],
    links: [{ source: "node0", target: "node1" }],
  });

  // GRAPH MODULE CONFIGURATION

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "#42F3FB",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  // LOGIN STATES AND FUNCTIONS

  const [authorized, setAuthorized] = useState(false);

  // const [ViewTopo, setViewTopo] = useState(true);
  // const [ViewTitlePage, setViewTitlePage] = useState(true);
  // const [ViewLogin, setViewLogin] = useState(true);
  // const ViewLoginForm = () => {
  //   setViewTitlePage(false);
  //   setViewLogin(true);
  // };

  // const onClickNode = function (nodeId) {
  //   console.log(nodeId);
  // };

  // const onClickLink = function (source, target) {
  //   window.alert(`Clicked link between ${source} and ${target}`);
  // };

  // const [nodesNum, setNodesNum] = useState(data.nodes.length);
  // const [linkInput, setLinkInput] = useState({
  //   sourceInput: "",
  //   destinationInput: "",
  // });

  // const [loginInput, setLoginInput] = useState({
  //   username: "",
  //   password: "",
  // });

  // const [nodeCordinates, setNodeCordinates] = useState({ x: 20, y: 20 });
  // const addNode = (memory, radius, cache, angle, cpu) => {
  //   console.log(memory, radius, cache, angle, cpu);
  //   setNodesNum(nodesNum + 1);
  //   const nodes = data.nodes.concat({
  //     id: `node${nodesNum}`,
  //     x: nodeCordinates.x,
  //     y: nodeCordinates.y,
  //     memory,
  //     radius,
  //     cache,
  //     angle,
  //     cpu,
  //   });
  //   setData({ nodes: nodes, links: data.links });
  //   setNodeCordinates({ x: nodeCordinates.x + 5, y: nodeCordinates.y + 10 });
  // };

  // const addLink = (bandwidth, delay, loss) => {
  //   const var1 = data.nodes.find((node) => node.id === linkInput.sourceInput);
  //   const var2 = data.nodes.find(
  //     (node) => node.id === linkInput.destinationInput
  //   );
  //   const var3 = data.links.find(
  //     (link) =>
  //       link.source === linkInput.sourceInput &&
  //       link.target === linkInput.destinationInput
  //   );
  //   if (var1 && var2) {
  //     if (var3) {
  //       window.alert("Link already exist!");
  //     } else {
  //       const links = data.links.concat({
  //         source: linkInput.sourceInput,
  //         target: linkInput.destinationInput,
  //         bandwidth,
  //         delay,
  //         loss,
  //       });
  //       console.log(links);
  //       setData({ nodes: data.nodes, links: links });
  //     }
  //   } else {
  //     const string = var1 ? "Second" : "First";
  //     window.alert(`${string} node does not exist`);
  //   }
  // };

  const createTopology = (history) => {
    axios
      .post("http://localhost:3001/topology", data)
      .then(() => {
        console.log("Data send to backend");
        history.push("/view");
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        // backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
        overflow: "hidden",
      }}
    >
      <ParticleComponent />

      {/* ROUTE HANDLING */}
      <BrowserRouter>
        <Switch>
          <Route path="/view">
            <TopoViewer data={data} myConfig={myConfig}></TopoViewer>
          </Route>
          <Route path="/build">
            {authorized ? (
              <TopoBuilder
                topoData={data}
                createTopology={createTopology}
                myConfig={myConfig}
                // username={loginInput.username}
              ></TopoBuilder>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          <Route path="/login">
            <Login setAuthorized={setAuthorized}></Login>
          </Route>
          <Route path="/">
            <TitlePage></TitlePage>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
