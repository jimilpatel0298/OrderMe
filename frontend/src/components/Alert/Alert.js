import React from 'react'
import {Alert} from 'react-bootstrap'

const AlertMsg = (props) => {
    return (
        <Alert variant={props.variant} style={{borderRadius: '15px', border: 'none'}}>
            <Alert.Heading>{props.title}</Alert.Heading>
            <hr />
            <div className="mb-0">
                {props.children}
            </div>
        </Alert>

    )
}

export default AlertMsg
