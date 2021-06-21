import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import CartItem from '../../components/CartItem/CartItem'
import Auxiliary from '../../hoc/Auxiliary'
import AlertMsg from '../../components/Alert/Alert'
import './Cart.css'
import { NavLink } from 'react-router-dom'

const Cart = (props) => {

    let cartItems = null

    if (props.cart.cartItems.length !== 0) {
        cartItems = props.cart.cartItems.map((cartItem) => {
            return <CartItem object={cartItem} key={cartItem.kid} clearCart={props.clearCart}/>
        })
    }

    return (
        <Auxiliary>
            {(() => {
                if (props.cart.cartItems.length !== 0) {
                    return (<Auxiliary>
                        <div className='cart-div'>
                            <h5 style={{ textAlign: 'center', marginBottom: '30px'}}>Order Summary</h5>
                            {cartItems}
                            <hr className='cart-hr' />
                            <Row>
                                <Col xs={8}>
                                    <h5>Total</h5>
                                </Col>
                                <Col xs={3} style={{ textAlign: 'right' }}>
                                    {props.cart.cartPrice === props.cart.totalPrice ? <h5 className='price'><span className='rupee'>₹ </span><span style={{fontWeight: '600'}}>{props.cart.cartPrice}</span></h5> : <div><h5 className='price' style={{textDecoration: 'line-through', textDecorationThickness: '1px'}}><span className='rupee'>₹ </span>{props.cart.totalPrice}</h5><h5 className='price' style={{ marginTop: '7px' }}><span className='rupee'>₹ </span><span style={{fontWeight: '600'}}>{props.cart.cartPrice}</span></h5></div> }
                                </Col>
                                <Col xs={1} style={{ padding: '0 10px 0 0' }}>
                                    <button type="button" className="close" aria-label="Close" style={{ padding: '0px' }}
                                    onClick={event => props.clearCart(event)}>
                                        <span aria-hidden="true" className='remove-btn-cart' id='clear'>&times;</span>
                                    </button>
                                </Col>
                            </Row>
                            <p style={{ fontStyle: 'italic' }}>Quantity: {props.cart.cartItems.length}</p>
                        </div>
                        <Form validated={props.validated} noValidate onSubmit={props.placeOrder}>
                        <div className='cart-div'>
                            <h5 style={{ textAlign: 'center'}}>Contact Details</h5>
                                <Form.Group as={Row} controlId="formHorizontalName" style={{ marginTop: '30px' }} >
                                    <Form.Label column xs={2}>Name</Form.Label>
                                    <Col xs={10}>
                                        <Form.Control type="text" placeholder="John Peter" className='input-field'
                                            value={props.name}
                                            onInput={(event) => props.nameHandler(event)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a name.
                                            </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPhone">
                                    <Form.Label column xs={2}>Phone</Form.Label>
                                    <Col xs={10}>
                                        <Form.Control type="text" placeholder="952XXXXX98" className='input-field'
                                            value={props.phone}
                                            onInput={(event) => props.phoneHandler(event)}
                                            required 
                                            pattern='[0-9]*' maxLength={10} minLength={10}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid contact number.
                                            </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                        </div>
                        <div className='div-place-order'>
                            <Button type='submit' className='btn-place-order'>Place Order</Button>
                        </div>
                        </Form>
                        </Auxiliary>)
                }
                else {
                    return <AlertMsg title={'Empty Cart!'} variant={'danger'}><NavLink to='/' className='view-menu-btn-link' style={{ textDecoration: 'none' }}><div className='view-menu-btn'>View MENU</div></NavLink></AlertMsg>
                }
            })()}

        </Auxiliary>
    )
}

export default Cart
