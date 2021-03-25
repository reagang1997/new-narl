import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from './logo.png';
import './style.css';

function NavTabs() {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();

  return (
  
    <div>
      <div className='center-logo'>
        <img src={logo} className='logo'></img>
        <div className='links'>

          <span>
            <Link to='/practiceResults' className={location.pathname === "/practiceResults" ? 'active link-color' : 'link-color'}>
              Practice Results
          </Link>
          </span>

          <span>
            <Link to='/driverStandings' className={location.pathname === "/driverStandings" ? 'active' : 'link-color'}>
              Driver Standings
          </Link>
          </span>

          <span>
            <Link to='/constructorStandings' className={location.pathname === "/constructorStandings" ? 'active' : 'link-color'}>
              Constructor Standings
          </Link>
          </span>

          <span>
            <Link to="/raceInformation" className={location.pathname === "/raceInformation" ? 'active' : 'link-color'} >
              Information
            </Link>
          </span>

          <span>
            <Link to="/driverStats" className={location.pathname === "/driverStats" ? 'active' : 'link-color'} >
              Driver Stats
            </Link>
          </span>

          <span>
            <Link to="/teamStats" className={location.pathname === "/teamStats" ? 'active' : 'link-color'} >
              Team Stats
            </Link>
          </span>
        </div>
      </div>

    </div>

  );
}

export default NavTabs;
