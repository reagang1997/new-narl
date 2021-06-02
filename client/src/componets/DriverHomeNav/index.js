import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './style.css'

const DriverHomeNav = ({ nav, setNav }) => {


    const plain = {
        color: 'black'
    }

    return (
        <Card body className='box f1 driver-nav'  style={{marginLeft: '180px'}}>
            <div style={{width: 'fit-content', margin: 'auto'}}>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link style={{padding: '0', marginBottom: '10px'}} onClick={e => setNav(e.target.innerHTML)} className={nav === 'Stats' ? 'active' : 'plain'}>Stats</Nav.Link>
                    <Nav.Link style={{padding: '0', marginBottom: '10px'}} onClick={e => setNav(e.target.innerHTML)} className={nav === 'Registration' ? 'active' : 'plain'}>Registration</Nav.Link>
                    <Nav.Link style={{padding: '0', marginBottom: '10px'}} onClick={e => setNav(e.target.innerHTML)} className={nav === 'Edit Profile' ? 'active' : 'plain'}>Edit Profile</Nav.Link>

                </Nav>
            </div>

        </Card>
    )
}

export default DriverHomeNav;