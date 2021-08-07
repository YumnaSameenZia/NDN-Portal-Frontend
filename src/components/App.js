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
    nodes: [
      { id: "node0", x: 100, y: 100 },
      { id: "node1", x: 200, y: 200 },
    ],
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

  const onClickNode = function (nodeId) {
    window.alert(nodeId);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  // LOGIN STATES AND FUNCTIONS

  const [authorized, setAuthorized] = useState(false);

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
        overflowY: "scroll",
      }}
    >
      <ParticleComponent />

      {/* ROUTE HANDLING */}
      <BrowserRouter>
        <Switch>
          <Route path="/view">
            {authorized ? (
              <TopoViewer
                data={data}
                graphConfig={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
              ></TopoViewer>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
            ;
          </Route>
          <Route path="/build">
            {authorized ? (
              <TopoBuilder
                topoData={data}
                setTopoData={setData}
                createTopology={createTopology}
                graphConfig={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
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
