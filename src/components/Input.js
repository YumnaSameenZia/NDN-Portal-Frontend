import React from 'react'
import PropTypes from 'prop-types'
import InputGroup from 'react-bootstrap/FormCheckInput'

const Input = ({inputType, plc, fieldName}) => {
    return (
        <div>
            <input type= {inputType} placeholder = {plc} name={fieldName}  />
        </div>
    )
}

Input.defaultProps = {
    inputType: 'text',
    plc: 'UserName',
}

Input.propTypes = {
    inputType: PropTypes.string,
    plc: PropTypes.string,
    fieldName: PropTypes.string.isRequired
}


export default Input
