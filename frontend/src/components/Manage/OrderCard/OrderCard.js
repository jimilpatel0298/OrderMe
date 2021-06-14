import React from 'react'
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap'
import './orderCard.css'
import ItemCard from '../ItemCard/ItemCard'

const OrderCard = (props) => {

    let border = null;
    let borderHeader = null;
    if (props.order.order.status === 'tobepaid') {
        border = 'info'
        borderHeader = '1px solid var(--info)'
    } else if (props.order.order.status === 'paid') {
        border = 'warning'
        borderHeader = '1px solid var(--warning)'
    } else if (props.order.order.status === 'prepared' && props.order.order.paidStatus === true) {
        border = 'success'
        borderHeader = '1px solid var(--success)'
    } else if (props.order.order.status === 'paylater') {
        border = 'danger'
        borderHeader = '1px solid var(--danger)'
    } else if (props.order.order.status === 'prepared' && props.order.order.paidStatus === false) {
        border = 'success'
        borderHeader = '1px solid var(--success)'
    }

    return (
        <Card border={border} className="orderCard" onClick={props.soundStop}>
            <Card.Header style={{borderBottom: 'none'}}>
                <Row style={{ textAlign: 'center' }}>
                    <Col lg={2}>Order No: <span className='bold'>{props.order.order.id}</span></Col>
                    <Col lg={2}>Items: <span className="bold">{props.order.orderItems.length}</span></Col>
                    <Col lg={5}>Contact: <span className="bold">{props.order.contactDetails.name} - {props.order.contactDetails.phone}</span></Col>
                    <Col lg={3}>Amount: <span className="bold">{props.order.order.total}</span> - {props.order.order.paidStatus === true ? <span>Paid</span> : <span>Not Paid</span>}</Col>
                </Row>
            </Card.Header>
            <Card.Body className='order-card-body'>
                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <CardDeck>
                            {props.order.orderItems.map(element => {
                                return <ItemCard item={element} key={element.id} />
                            })}
                        </CardDeck>
                    </Col>
                    <Col lg={3} id='orderCardBtn'>
                        {(() => {
                            if (props.order.order.status === 'tobepaid') {
                                return (<>
                                    <Button variant="outline-secondary" id='cancel' onClick={(event) => props.statusHandler(event, props.order)}>Cancel</Button>
                                    <Button variant="info" id='paid' onClick={(event) => props.statusHandler(event, props.order, true)}>Paid</Button>
                                    <Button variant="danger" id='payLater' onClick={(event) => props.statusHandler(event, props.order)}>Pay Later</Button>
                                </>
                                )
                            } else if (props.order.order.status === 'paid') {
                                return (<>
                                    <Button variant="outline-secondary" id='preparing' disabled onClick={(event) => props.statusHandler(event, props.order)}>Preparing</Button>
                                    <Button variant="warning" id='prepared' onClick={(event) => props.statusHandler(event, props.order)}>Prepared</Button>
                                </>
                                )
                            } else if (props.order.order.status === 'prepared' && props.order.order.paidStatus === true) {
                                return (<>
                                    <Button variant="success" id='dispatched' onClick={(event) => props.statusHandler(event, props.order)}>Dispatched</Button>
                                </>
                                )
                            }
                            else if (props.order.order.status === 'paylater') {
                                return (<>
                                    <Button variant="outline-secondary" id='preparing' disabled onClick={(event) => props.statusHandler(event, props.order)}>Preparing</Button>
                                    <Button variant="info" id='paid' onClick={(event) => props.statusHandler(event, props.order, true)}>Paid</Button>
                                    <Button variant="danger" id='prepared' onClick={(event) => props.statusHandler(event, props.order)}>Prepared</Button>
                                </>
                                )
                            } else if (props.order.order.status === 'prepared' && props.order.order.paidStatus === false ) {
                                return (<>
                                    <Button variant="info" id='paid' onClick={(event) => props.statusHandler(event, props.order, true)}>Paid</Button>
                                    <Button variant="success" id='dispatched' onClick={(event) => props.statusHandler(event, props.order)}>Dispatched</Button>
                                </>
                                )
                            }
                        })()}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default OrderCard
