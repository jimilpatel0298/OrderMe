import React from 'react'
import { useState } from 'react'
import { Row, Col, Modal, Button, Container } from 'react-bootstrap';
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {
  // Order States 
  const [order, setOrder] = useState([]);
  // const [orderItem, setOrderItem] = useState([{isAdded: false, quantity: 0}]);

  // Modal States 
  const [modalInfo, setModalInfo] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onAddClick = (item) => {
    // setModalInfo(item)
    // handleShow()
    // setOrderItem([{isAdded: true, quantity: 1}  , item])
  }

  // const addOrder = (orderItem) => {
  //   setOrder([...order, orderItem])
  //   handleClose()
  // }

  // Modal Code for Customization of new order item 
  const CustomizeModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Customize your order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  </Modal.Body>
          <Modal.Footer style={{ display: 'inline-block' }}>
            <Row className='justify-content-between'>
              <Col className='item-value'>
                <h5 style={{ padding: '7px 0' }}>Total: <span>₹</span> {modalInfo.price}</h5>
              </Col>
              <Col>
                <Button variant="primary" className='btn-add-to-cart' 
                onClick={() => {
                  // addOrder(orderItem)
                }}>
                  Add To Cart</Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  return (
    <div className="App">
      <Header />
      <Container>
        <Menu/>
        {show ? <CustomizeModal /> : null}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
