import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import { TerminalContextProvider } from "react-terminal";

ReactDOM.render(
  <TerminalContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TerminalContextProvider>,
  document.getElementById("root")
);
