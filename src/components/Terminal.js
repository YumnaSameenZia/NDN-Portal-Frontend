import React from "react";
import { ReactTerminal } from "react-terminal";

const Terminal = ({ onClickCmd }) => {
  const commands = {
    whoami: "A speck of dust in grand cosmos",
    net: () => onClickCmd(`net run`),
    iperf: () => onClickCmd(`iperf`),
  };
  const theme = {
    themeBGColor: "#272B36",
    themeToolbarColor: "#DBDBDB",
    themeColor: "#FFFEFC",
    themePromptColor: "#A917A8",
  };
  return (
    <div
      style={{
        position: "relative",
        marginTop: "5px",
        overflowY: "scroll",
      }}
    >
      <ReactTerminal
        commands={commands}
        themes={{
          myCustomTheme: {
            themeBGColor: "#272B36",
            themeToolbarColor: "#DBDBDB",
            themeColor: "#FFFEFC",
            themePromptColor: "#a917a8",
          },
        }}
        theme="myCustomTheme"
      />
    </div>
  );
};

export default Terminal;
