import React, { useState } from "react";
import Login from "./Login";
import TopoBuilder from "./TopoBuilder";
import TopoViewer from "./TopoViewer";
import axios from "axios";
import TitlePage from "./TitlePage";
import SignUp from "./SignUp";
import Router from "../icons/router.svg";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ParticleComponent from "./ParticleComponent";

function App() {
  // TOPOLOGY CONFIGURATION
  const [data, setData] = useState({
    nodes: [{ id: "node1" }, { id: "node2" }],
    links: [{ source: "node1", target: "node2" }],
  });

  // GRAPH MODULE CONFIGURATION
  // changed 'size' property and changed node from circle to 'router.svg'
  const myConfig = {
    nodeHighlightBehavior: true,
    width: window.innerWidth,
    node: {
      color: `lightgreen`,
      size: 700,
      fontSize: 12,
      highlightFontSize: 15,
      highlightStrokeColor: `blue`,
      svg: Router,
    },
    link: {
      highlightColor: `lightblue`,
      color: `blue`,
    },
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
              <TopoViewer topoData={data} graphConfig={myConfig}></TopoViewer>
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
              ></TopoBuilder>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          <Route path="/login">
            <Login setAuthorized={setAuthorized}></Login>
          </Route>
          {/* SIGN UP NEW USER */}
          <Route path="/signup">
            <SignUp setAuthorized={setAuthorized} />
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
