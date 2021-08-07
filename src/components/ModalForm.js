import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TextInput from "./TextInput";

const ModalForm = ({
  title,
  config,
  fields,
  showModal,
  setShowModal,
  submitHandler,
}) => {
  const tempConfig = config;
  const textInputs = fields.map((value, i) => {
    return (
      <TextInput
        key={i}
        name={value.name}
        title={value.title}
        placeHolder={value.placeHolder}
        inputValue={value.inputValue}
        changeHandler={value.changeHandler}
      ></TextInput>
    );
  });
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{textInputs}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            submitHandler();
            console.log(config);
            setShowModal(false);
          }}
        >
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
