import React from "react";
import { Alert } from "react-bootstrap";

export const MessageAlert = ({ message, variant, showAlert }) => {
  if (showAlert) {
    return (
      <Alert className="text-center" variant={variant}>
        {message + ". "}
      </Alert>
    );
  } else {
    return null;
  }
};

export default MessageAlert;
