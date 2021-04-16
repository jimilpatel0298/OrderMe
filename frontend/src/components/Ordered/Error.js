import React from 'react'
import AlertMsg from '../Alert/Alert'

const Error = (props) => {
    return (
        <AlertMsg title={'Order Placed Successfully!'} variant="danger">
            <p>Thank you for your order. We've received it at our end.</p>
            <p>Please pay Rs. 250 at the counter to continue with the order.</p>
        </AlertMsg>
    )
}

export default Error
