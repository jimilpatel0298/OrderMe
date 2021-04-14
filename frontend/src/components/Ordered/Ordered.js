import React from 'react'
import AlertMsg from '../Alert/Alert'

const Ordered = (props) => {
    return (
        <AlertMsg title={'Order Placed Successfully!'} variant={'success'}>
            {props.children}
        </AlertMsg>
    )
}

export default Ordered
