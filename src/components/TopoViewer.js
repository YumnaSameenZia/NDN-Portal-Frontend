import React from "react";
import { Graph } from "react-d3-graph";
import { Container, Button, Row, Col } from "react-bootstrap";

const TopoViewer = ({ data, myConfig, onClickLink, onClickNode, ViewTopo }) => {
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
        <Row className="pt-3">
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
        </Row>
      </Container>
    );
  } else {
    return null;
  }
};

export default TopoViewer;
