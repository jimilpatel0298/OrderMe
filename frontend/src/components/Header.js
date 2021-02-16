import { Col, Row } from 'react-bootstrap'

const Header = () => {
    return (
        <div className='header'>
            <Row>
                <Col xs={4}>
                    <h3>Logo</h3>
                </Col>
                <Col xs={8} style={{ textAlign: 'right' }}>
                    <h3>Company Name</h3>
                </Col>
            </Row>
        </div>
    )
}

export default Header
