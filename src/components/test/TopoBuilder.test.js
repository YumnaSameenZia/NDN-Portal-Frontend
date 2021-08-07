import React from "react"
import {render, fireEvent} from "@testing-library/react"
import TopoBuilder from "../TopoBuilder"

// renders: TopoBuilder.js
// element: button, create topology
// data-testid: create-topology-button
it("renders correctly", ()=> {
    const {queryByTestId} = render(<TopoBuilder />)
    expect(queryByTestId("create-topology-button")).toBeInTheDocument
})

// renders: TopoBuilder.js
// element: button, view topology
// data-testid: view-topology-button
it("renders correctly", ()=> {
    const {queryByTestId} = render(<TopoBuilder />)
    expect(queryByTestId("view-topology-button")).toBeInTheDocument
})