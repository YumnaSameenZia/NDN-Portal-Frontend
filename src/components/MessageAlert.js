import React from 'react'
import {Alert} from "react-bootstrap"

export const MessageAlert = ({ message, variant }) => {

  return (
      <Alert variant={variant}>
          {message + ". "}
      </Alert>
  );
};

export default MessageAlert;