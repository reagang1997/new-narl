import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import logo from './logo.png';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './style.css';
import Header from "../theme/Header/Header";

function NavTabs({ loggedIn, guid }) {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
    </div>
    // <Header color='primary'>
      
    // </Header>
  //   <Navbar id='my-nav' collapseOnSelect expand="lg" bg="dark" variant="dark" className='f1' style={{ background: '#252525' }}>

  //   <Navbar.Brand onClick={e => history.push('/')} style={{ marginLeft: '258px' }}>
  //     <img src={logo} style={{ height: '50px' }} />
  //   </Navbar.Brand>
  //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //   <Navbar.Collapse id="responsive-navbar-nav">
  //     <Nav className="mr-auto">
  //       <Nav.Link onClick={e => history.push('/practiceResults')}>Practice Results</Nav.Link>
  //       <NavDropdown title="League Info" id="collasible-nav-dropdown">
  //         <NavDropdown.Item onClick={e => history.push('/raceInformation')}>This Week</NavDropdown.Item>
  //         <NavDropdown.Item onClick={e => history.push('/schedule')}>Schedule</NavDropdown.Item>
  //         <NavDropdown.Item onClick={e => history.push('/ruleBook')}>Rule Book</NavDropdown.Item>

  //       </NavDropdown>
  //       <NavDropdown title="Standings" id="collasible-nav-dropdown">
  //         <NavDropdown.Item onClick={e => history.push('/driverStandings')}>Driver Standings</NavDropdown.Item>
  //         <NavDropdown.Item onClick={e => history.push('/constructorStandings')}>Constructor Standings</NavDropdown.Item>

  //       </NavDropdown>

  //     </Nav>
  //     <Nav>
  //       <div className='driver-home'>
  //         {loggedIn ? <Nav.Link onClick={e => history.push(`/driverHome/${guid}`)}>Driver Home</Nav.Link> : <Nav.Link onClick={e => history.push('/loginSignup')} >Log in / Signup</Nav.Link>}
  //         {/* <Nav.Link href="/adminHome">Admin Home</Nav.Link> */}
  //       </div>
  //     </Nav>
  //   </Navbar.Collapse>

  // </Navbar>


  );
}

export default NavTabs;
