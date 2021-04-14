import React from 'react'
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap'
import './orderCard.css'
import ItemCard from '../ItemCard/ItemCard'

const OrderCard = (props) => {

    let border = null;
    let borderHeader = null;
    if (props.order.order.status === 'tobepaid') {
        border = 'info'
        borderHeader = 'border-' + border
    } else if (props.order.order.status === 'paid') {
        border = 'warning'
        borderHeader = 'border-' + border
    } else if (props.order.order.status === 'prepared') {
        border = 'success'
        borderHeader = 'border-' + border
    }

    return (
        <Card border={border} className="orderCard">
            <Card.Header style={{borderBottom: 'none'}}>
                <Row style={{ textAlign: 'center' }}>
                    <Col lg={1} className="bold">#{props.order.order.id}</Col>
                    <Col lg={2}>Items: <span className="bold">{props.order.orderItems.length}</span></Col>
                    <Col lg={6}>Contact: <span className="bold">{props.order.contactDetails.name} | {props.order.contactDetails.phone}</span></Col>
                    <Col lg={3}>Amount: <span className="bold">{props.order.order.total}</span></Col>
                </Row>
            </Card.Header>
            <Card.Body>
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
                                    <Button variant="info" id='paid' onClick={(event) => props.statusHandler(event, props.order)}>Paid</Button>
                                </>
                                )
                            } else if (props.order.order.status === 'paid') {
                                return (<>
                                    <Button variant="outline-secondary" id='cancel' onClick={(event) => props.statusHandler(event, props.order)}>Cancel</Button>
                                    <Button variant="warning" id='preparing' disabled onClick={(event) => props.statusHandler(event, props.order)}>Preparing</Button>
                                </>
                                )
                            } else if (props.order.order.status === 'prepared') {
                                return (<>
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
