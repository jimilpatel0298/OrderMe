import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <a href='/'><Navbar.Brand>Bread Bites</Navbar.Brand></a>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* <Nav className='ml-auto'>
                            <Nav.Link as={NavLink} to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                        </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
