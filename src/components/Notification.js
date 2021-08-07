import { React, useState } from "react";
import { Toast } from "react-bootstrap";

const Notification = ({ title, message, show, setShow }) => {
  return (
    <div>
      <Toast show={show} onClose={() => setShow(false)}>
        <Toast.Header>
          <strong className="me-auto block">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-left text-white bg-dark">
          {message}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Notification;
