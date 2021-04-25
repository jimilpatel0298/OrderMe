import React from 'react'
import PropTypes from 'prop-types'
import {Col, Button, Row } from 'react-bootstrap'

import defaultImage from '../../images/img-default.png'
import './MenuItem.css'

const MenuItem = (props) => {
    const url = window.location.host
    const image_url = url + props.item.image
    
    return (
        <div className='item'>
            <Row>
                <Col xs={4}>
                    <div className='item-image'>
                        {props.item.image == null ? <img src={defaultImage} alt='Product' /> :
                            <img src={image_url} alt='Product' />}
                    </div>
                </Col>
                <Col xs={8}>
                    <div className='item-details'>
                        <h4>{props.item.name}</h4>
                        <p>{props.item.description}</p>
                        <Row>
                            <Col>
                                <h5 className='price'><span className='rupee'>₹</span> {props.item.price}</h5>
                            </Col>
                            <Col>
                                <Button className='btn-item-add' onClick={() => props.onAdd(props.item, props.category)}>Add</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

MenuItem.protoTypes = {
    category: PropTypes.string.isRequired
}

export default MenuItem

