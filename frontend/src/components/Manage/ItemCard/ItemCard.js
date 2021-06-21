import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import './ItemCard.css'

const ItemCard = (props) => {
    return (
        <Card className="item-card">
            <Card.Body className='item-card-body'>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.item.category}</Card.Subtitle>
                <Card.Text as='div' className='item-card-body-text'>
                <p><span style={{fontStyle: 'italic'}}>Price: </span><span style={{fontWeight: '500'}}>{props.item.total}</span></p>
                    <p><span style={{fontStyle: 'italic'}}>Size: </span><span style={{fontWeight: '500'}}>{props.item.itemSize.name}</span></p>
                    {props.item.itemAddons.length !==0 ?
                    <Row>
                        <Col xs={4} style={{paddingRight: '0px'}}><p style={{fontStyle: 'italic'}}>Addons:</p></Col>
                        <Col xs={8} style={{paddingLeft: '0px', fontWeight: '500'}}>{props.item.itemAddons.map(element => {
                            return <p key={element.id}>{element.name}</p>
                        })}</Col>
                    </Row> : null }
                </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
        </Card>
    )
}

export default ItemCard
