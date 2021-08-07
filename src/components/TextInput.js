import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const TextInput = ({ name, title, placeHolder, inputValue, changeHandler }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text
        style={{
          borderBottomRightRadius: "0",
          borderTopRightRadius: "0",
          width: "80px",
          justifyContent: "center",
        }}
      >
        {title}
      </InputGroup.Text>
      <FormControl
        name={name}
        placeholder={placeHolder}
        value={inputValue}
        onChange={changeHandler}
      />
    </InputGroup>
  );
};

export default TextInput;
