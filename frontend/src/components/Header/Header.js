import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../../images/name_transparent.png'
import close from '../../images/close.png'

const Header = (props) => {
    return (
        <header>
            <Navbar expand="lg" bg="secondary" variant="dark" fixed="top" className='bg-header'>
                <Container>
                <img src={logo} className='img-logo' alt='logo'/>
                <Nav className='ml-auto'>
                    <h5 style={{padding: '0px', margin: '0px', textTransform: 'uppercase'}}>{props.title}</h5>
                    </Nav> 
                    {props.title === 'manage' ? <img src={close} alt='close manage' style={{marginLeft: '10px', width: '35px'}} onClick={props.closeManage} /> : null} 


                    {/* <a href='/'><Navbar.Brand><img src={logo} className='img-logo' /></Navbar.Brand></a> */}
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                    {/* <Navbar.Collapse id="responsive-navbar-nav">
                            {/* <Nav.Link as={NavLink} to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link> */}
                            {/* <h3>MENU</h3> */}
                        {/* </Nav> */}
                    {/* </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
