import { React, useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

const TopoViewer = ({ data, myConfig, onClickLink, onClickNode, ViewTopo }) => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  if (ViewTopo) {
    return (
      <Container style={{ height: "100vh" }}>
        <h1 style={{ fontFamily: "Roboto" }}>Topology Viewer</h1>
        <div
          style={{
            border: "2px solid black",
            width: "100%",
            height: "50vh",
            backgroundColor: "white",
          }}
        >
          <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        </div>
        <Row className="mt-1">
          <Col>
            <Button variant="secondary" block>
              CMD
            </Button>{" "}
          </Col>
          <Col>
            <Button variant="secondary" block>
              CS
            </Button>{" "}
          </Col>
          <Col>
            <Button variant="secondary" block>
              PIT
            </Button>{" "}
          </Col>
          <Col>
            <Button variant="secondary" block>
              FIB
            </Button>{" "}
          </Col>
        </Row>
        {/* <Row className="pt-3">
          <Col style={{ border: "3px solid black" }}>CS Entry</Col>
          <Col style={{ border: "3px solid black" }}>CS Data</Col>
        </Row>
        <Row>
          <Col style={{ border: "3px solid black", height: "150px" }}>
            /switch1/video1/v1
          </Col>
          <Col style={{ border: "3px solid black", height: "150px" }}>
            Cached content at Node 1
          </Col>
        </Row> */}

        {/* Writing Command part here */}
        <Row className="pt-3">
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              disabled
              placeholder="See output here"
              value={output}
            />
            <Form.Control
              type="text"
              className="mt-1"
              placeholder="Write command here"
              value={command}
              onChange={(event) => {
                setCommand(event.target.value);
              }}
            ></Form.Control>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              className="mt-1"
              style={{ width: "6em" }}
              onClick={(event) => {
                axios
                  .post("http://localhost:3001/command", {
                    command: command,
                  })
                  .then((response) => {
                    console.log(response.data);
                    setOutput(response.data);
                  });
              }}
            >
              Run
            </Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return null;
  }
};

export default TopoViewer;
