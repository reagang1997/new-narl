import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';


const DriverHomeNav = ({ nav, setNav }) => {


    const plain = {
        color: 'black'
    }

    return (
        <Card body className='box f1 ' style={{ width: 'fit-content' }}>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link onClick={e => setNav(e.target.innerHTML)} className={nav === 'Stats' ? 'active' : 'plain'}>Stats</Nav.Link>
                <Nav.Link onClick={e => setNav(e.target.innerHTML)} className={nav === 'Registration' ? 'active' : 'plain'}>Registration</Nav.Link>
                <Nav.Link onClick={e => setNav(e.target.innerHTML)} className={nav === 'Edit Profile' ? 'active' : 'plain'}>Edit Profile</Nav.Link>
                
            </Nav>
        </Card>
    )
}

export default DriverHomeNav;