import { React, useState } from "react";
import Terminal, { LineType, ColorMode } from "react-terminal-ui";

// const Terminal = ({ onClickCmd }) => {
//   const commands = {
//     whoami: "A speck of dust in grand cosmos",
//     net: () => onClickCmd(`net run`),
//     iperf: () => onClickCmd(`iperf`),
//   };
//   const theme = {
//     themeBGColor: "#272B36",
//     themeToolbarColor: "#DBDBDB",
//     themeColor: "#FFFEFC",
//     themePromptColor: "#A917A8",
//   };
//   return (
//     <div
//       style={{
//         position: "relative",
//         marginTop: "5px",
//         overflowY: "scroll",
//       }}
//     >
//       <ReactTerminal
//         commands={commands}
//         themes={{
//           myCustomTheme: {
//             themeBGColor: "#272B36",
//             themeToolbarColor: "#DBDBDB",
//             themeColor: "#FFFEFC",
//             themePromptColor: "#a917a8",
//           },
//         }}
//         theme="myCustomTheme"
//       />
//     </div>
//   );
// };

const TerminalComp = ({ onClickCmd }) => {
  const [lineData, setLineData] = useState([
    {
      type: LineType.Output,
      value:
        "Write commands here!\nTo see really long outputs toggle terminal off...",
    },
    ,
  ]);
  const onInput = async (input) => {
    let ld = [];
    ld.push({ type: LineType.Input, value: input });
    if (input.toLocaleLowerCase() === "clear") {
      ld = [];
    } else if (input) {
      const output = await onClickCmd(input);
      ld.push({ type: LineType.Output, value: output });
    }
    setLineData(ld);
  };
  return (
    <div className="container">
      <Terminal
        name="Terminal"
        colorMode={ColorMode.Dark}
        lineData={lineData}
        onInput={(terminalInput) => {
          onInput(terminalInput);
        }}
      />
    </div>
  );
};

export default TerminalComp;
