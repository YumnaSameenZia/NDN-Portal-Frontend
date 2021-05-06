import React, { useState } from "react";
import { Graph } from "react-d3-graph";
import {
  Container,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const TopoBuilder = ({
  data,
  addNode,
  addLink,
  linkInput,
  setLinkInput,
  createTopology,
  myConfig,
  onClickLink,
  onClickNode,
  ViewTopo,
  viewBuilder,
}) => {
  const [makeTopo, setMakeTopo] = useState(false);
  if (viewBuilder === true) {
    return (
      <Container>
        <h1 style={{ fontFamily: "Roboto", paddingTop: "20px" }}>TOPOLOGY</h1>
        <Row style={makeTopo ? {} : { height: "85vh" }}>
          <Col>
            <Button variant="secondary" block onClick={() => setMakeTopo(true)} data-testid="create-topology-button">
              Create Topology
            </Button>{" "}
          </Col>
          <Col>
            <Button variant="secondary" block onClick={createTopology} data-testid="view-topology-button">
              View Topology
            </Button>{" "}
          </Col>
        </Row>
        <br></br>

        <Row className={makeTopo ? "" : "d-none"}>
          <Col className="justify-content-right">
            <br></br>
            <br></br>
            <br></br>
            <Button variant="secondary" onClick={addNode} block>
              Add Node
            </Button>{" "}
            <br></br>
            {/* <input
            type="text"
            value={linkInput.sourceInput}
            placeholder="Source Node"
            onChange={(event) => {
              setLinkInput({
                sourceInput: event.target.value,
                destinationInput: linkInput.destinationInput,
              });
            }}
          />
          <br></br>
          <input
            type="text"
            value={linkInput.destinationInput}
            placeholder="Destination Node"
            onChange={(event) => {
              setLinkInput({
                destinationInput: event.target.value,
                sourceInput: linkInput.sourceInput,
              });
            }}
          />
          <br></br> */}
            <InputGroup className="">
              <FormControl
                aria-label="Source Node"
                aria-describedby="basic-addon1"
                value={linkInput.sourceInput}
                placeholder="Source Node"
                onChange={(event) => {
                  setLinkInput({
                    sourceInput: event.target.value,
                    destinationInput: linkInput.destinationInput,
                  });
                }}
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <FormControl
                aria-label="Destination Node"
                aria-describedby="basic-addon1"
                value={linkInput.destinationInput}
                placeholder="Destination Node"
                onChange={(event) => {
                  setLinkInput({
                    destinationInput: event.target.value,
                    sourceInput: linkInput.sourceInput,
                  });
                }}
              />
            </InputGroup>
            <Button variant="secondary" onClick={addLink} block>
              Add Link
            </Button>{" "}
            <br></br>
            <br></br>
            <br></br>
            <Button variant="secondary" onClick={createTopology} block>
              Submit
            </Button>{" "}
            {/* <Button variant="secondary" block>
              Delete
            </Button>
            <Button variant="secondary" block>
              Go Back
            </Button>{" "} */}
          </Col>
          <Col>
            <div
              style={{
                border: "2px solid black",
                width: "100%",
                height: "80vh",
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
          </Col>
        </Row>
      </Container>
    );
  } else {
    return null;
  }
};

export default TopoBuilder;
