import React from 'react'
import Button from 'react-bootstrap/Button'
import '../components/Button.css'

const ButtonComp = ({text, clr, bgclr}) => {
    const btnStyle = {
        backgroundColor: 'white'
    }
    
    return (
        <div>
            <button type='submit' style={btnStyle}>{text}</button>
        </div>
    )
}

ButtonComp.defaultProps = {
    clr: 'white',
    text: 'Submit',
    bgclr: 'green',
}

export default ButtonComp
