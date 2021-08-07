import { React, useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);
  /*
    WELCOME ALERT MESSAGE
  */
  if (showAlert) {
    return (
      <Alert
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
        transition
      >
        {message}
      </Alert>
    );
  } else {
    return null;
  }
};

export default AlertMessage;
