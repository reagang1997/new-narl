import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from './logo.png';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './style.css';

function NavTabs() {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='f1'>
      <Navbar.Brand href="/">
        <img src={logo} style={{ height: '50px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/practiceResults">Practice Results</Nav.Link>
          <Nav.Link href="/raceInformation">Information</Nav.Link>
          <NavDropdown title="Standings" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/driverStandings">Driver Standings</NavDropdown.Item>
            <NavDropdown.Item href="/constructorStandings">Constructor Standings</NavDropdown.Item>
            
          </NavDropdown>

        </Nav>
        <Nav>
        <Nav.Link href="/loginSignup">Log in / Signup</Nav.Link>
          {/* <Nav.Link href="/adminHome">Admin Home</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <div>
    //   <div style={{width: 'fit-content', margin: 'auto'}}>
    //     <img src={logo} className='logo'></img>
    //   </div>
    //   <div className='links f1'>

    //     <span>
    //       <Link to='/practiceResults' className={location.pathname === "/practiceResults" ? 'active link-color' : 'link-color'}>
    //         Practice Results
    //       </Link>
    //     </span>

    //     <span>
    //       <Link to='/driverStandings' className={location.pathname === "/driverStandings" ? 'active' : 'link-color'}>
    //         Driver Standings
    //       </Link>
    //     </span>

    //     <span>
    //       <Link to='/constructorStandings' className={location.pathname === "/constructorStandings" ? 'active' : 'link-color'}>
    //         Constructor Standings
    //       </Link>
    //     </span>

    //     <span>
    //       <Link to="/raceInformation" className={location.pathname === "/raceInformation" ? 'active' : 'link-color'} >
    //         Information
    //         </Link>
    //     </span>

    //     <span>
    //         <Link to="/driverStats" className={location.pathname === "/driverStats" ? 'active' : 'link-color'} >
    //           Driver Stats
    //         </Link>
    //       </span>

    //       {/* <span>
    //         <Link to="/teamStats" className={location.pathname === "/teamStats" ? 'active' : 'link-color'} >
    //           Team Stats
    //         </Link>
    //       </span> */}
    //     <span>
    //       <Link to="/adminHome" className={location.pathname === "/adminHome" ? 'active' : 'link-color'} >
    //         Admins
    //         </Link>
    //     </span>
    //   </div>
    // </div>


  );
}

export default NavTabs;
