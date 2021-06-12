import React from 'react'
import PropTypes from 'prop-types'
import {Col, Button, Row } from 'react-bootstrap'

import defaultImage from '../../images/img-default.png'
import './MenuItem.css'

const MenuItem = (props) => {
    const url = window.location.host
    const image_url = 'http://' + url + props.item.image
    
    return (
        <div className='item'>
            <Row>
                <Col xs={4} style={{paddingRight: '0px'}}>
                    <div className='item-image'>
                        {props.item.image == null ? <img src={defaultImage} alt='Product' /> :
                            <img src={image_url} alt='Product' />}
                    </div>
                </Col>
                <Col xs={8} style={{paddingLeft: '0px'}}>
                    <div className='item-details d-flex flex-column'>
                        <h4>{props.item.name}</h4>
                        <p>{props.item.description}</p>
                        <div className='item-footer mt-auto'>
                        <Row>
                            <Col>
                                <h4 className='price'><span className='rupee'>₹</span> {props.item.price}</h4>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <Button className='btn-item-add' onClick={() => props.onAdd(props.item, props.category)}>Add<sup>+</sup></Button>
                            </Col>
                        </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* <div class="card mb-3" style={{maxWidth: '300px'}}>
  <div class="row g-0">
    <div class="col-4">
      <img src={defaultImage} alt="..." />
    </div>
    <div class="col-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div> */}
        </div>
    )
}

MenuItem.protoTypes = {
    category: PropTypes.string.isRequired
}

export default MenuItem

