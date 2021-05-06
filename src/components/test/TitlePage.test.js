import React from "react"
import {render, fireEvent} from "@testing-library/react"
import TitlePage from "../TitlePage"

// renders: TitlePage.js
// element: heading, ITTILAH PORTAL
// data-testid: portal-name
it("renders correctly", ()=> {
    const {queryByTestId} = render(<TitlePage />)
    expect(queryByTestId("portal-name")).toBeInTheDocument
})