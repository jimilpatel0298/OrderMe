import {useState} from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import Quantity from './Quantity'
import defaultImage from '../images/img-default.png'


const Item = ({item, onAddClick}) => {
    const [orderItem, setOrderItem] = useState([{isAdded: false, quantity: 0}]);

    return (
        <div className='item'>
            <Row>
                <Col xs={4}>
                    <div className='item-image'>
                        <img src={defaultImage} alt='Product Image' />
                    </div>
                </Col>
                <Col xs={8}>
                    <div className='item-details'>
                        <h4>{item.name}</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <Row className='item-value'>
                            <Col>
                                <h5><span>₹</span> {item.price}</h5>
                            </Col>
                            <Col>
                                {true ? <Button className='btn-item-add' onClick={
                                    () => {
                                        onAddClick(item)
                                    }
                                }>Add</Button> :
                                <Quantity/>}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Item
