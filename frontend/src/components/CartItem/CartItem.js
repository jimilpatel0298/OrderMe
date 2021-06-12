import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './CartItem.css'

const CartItem = (props) => {
    function addons() {
        if (props.object.addons.length !== 0) {
            return (
                <Row>
                    <Col xs={3}><p style={{ textTransform: 'capitalize' }}>Addons: </p></Col>
                    <Col xs={9}>
                        {props.object.addons.map((obj) => {
                            return <p key={obj.id}>{obj.name}</p>
                        })}
                    </Col>
                </Row>
            )
        }
    }
    return (
        <Row className='cartItem'>
            <Col xs={8}>
                <h5>{props.object.name}</h5>
                <Row>
                    <Col xs={3}><p>Category: </p></Col>
                    <Col xs={9}><p>{props.object.category}</p></Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <p style={{ textTransform: 'capitalize' }}>Size: </p>
                    </Col>
                    <Col xs={9}>
                        <p>{props.object.size.name}</p>
                    </Col>
                </Row>
                {
                    addons()
                }
            </Col>
            <Col xs={3} style={{ textAlign: 'right' }}>
                <Row>
                <Col style={{marginRight: '3px'}}><h5 className='price' style={{ textDecoration: props.object.bogo ? 'line-through' : 'none' }}><span className='rupee'>₹ </span>{props.object.totalPrice}</h5></Col>
                </Row>
                {props.object.bogo ? 
                <Row>
                    <Col style={{textAlign: 'right'}}><h5 className='free-badge'>free</h5></Col>
                </Row> : null }
            </Col>
            <Col xs={1} style={{padding: '0 10px 0 0'}}>
                <button type="button" className="close" aria-label="Close" onClick={event => props.clearCart(event, props.object)}>
                    <span aria-hidden="true" className='remove-btn-cart' id='remove'>&times;</span>
                </button>
            </Col>
        </Row>
    )
}

export default CartItem
