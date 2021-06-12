import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center'><p style={{fontSize: '12px'}}>Copyright &copy; Bread Bites</p></Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
