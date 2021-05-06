import React from "react"
import {render, fireEvent, cleanup} from "@testing-library/react"
import Login from "../Login"


cleanup()
// renders: Login.js
// element: form-control, username
// data-testid: login-form-username
it("renders correctly", ()=> {
    const {queryByTestId} = render(<Login />)
    expect(queryByTestId("login-form-username")).toBeInTheDocument
})

// renders: Login.js
// element: form-control, password
// data-testid: login-form-password
it("renders correctly", ()=> {
    const {queryByTestId} = render(<Login />)
    expect(queryByTestId("login-form-password")).toBeInTheDocument
})