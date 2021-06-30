import React from 'react'
import { Navbar, Container, Nav, DropdownButton, Dropdown } from 'react-bootstrap'
import logo from '../../images/name_transparent.png'
import close from '../../images/close.png'

const Header = (props) => {
    return (
        <header>
            <Navbar expand="lg" bg="secondary" variant="dark" fixed="top" className='bg-header' style={props.title === 'menu' ? {alignItems: 'flex-start'} : null}>
                <img src={logo} className='img-logo' alt='logo'/>
                <Nav className='ml-auto'>
                
                    {props.title === 'menu' ? 
                    <Dropdown>
                    <Dropdown.Toggle variant="success" as='div' id="dropdown-basic-button" style={{height: '40px', padding: '10px 0', textAlign: 'right'}}>
                        <span className='menu-span'>MENU</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {props.menuItems.map((iteration, index) => {
                            let str = iteration.type.replace(/\s+/g, '-');
                            return <Dropdown.Item onClick={event => {props.menuClicked(str)}} key={iteration.type + '_' + index}>{iteration.type}</Dropdown.Item>
                        })}
                    </Dropdown.Menu> 
                    </Dropdown>
                    : <h5 style={{padding: '0px', margin: '0px', textTransform: 'uppercase'}}>{props.title}</h5>}
                    
                    </Nav> 
                    {props.title === 'manage' ? <img src={close} alt='close manage' style={{marginLeft: '10px', width: '35px'}} onClick={props.closeManage} /> : null} 


                    {/* <a href='/'><Navbar.Brand><img src={logo} className='img-logo' /></Navbar.Brand></a> */}
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                    {/* <Navbar.Collapse id="responsive-navbar-nav">
                            {/* <Nav.Link as={NavLink} to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link> */}
                            {/* <h3>MENU</h3> */}
                        {/* </Nav> */}
                    {/* </Navbar.Collapse> */}
            </Navbar>
        </header>
    )
}

export default Header
