import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import alfaR from './img/alfa.png';
import alphaT from './img/alpha.png';
import ferrari from './img/ferrari.png';
import haas from './img/h.png';
import merc from './img/mb.png';
import mclaren from './img/mc.png';
import redBull from './img/rb.png';
import renault from './img/renault.png';
import racingPoint from './img/rp.png';
import williams from './img/w.png';

import './style.css';

function TeamIcon({ teamName }) {

    const history = useHistory();
    let img;
    let teamClass;
    if (teamName.indexOf(' ') < 0) {
        teamClass = teamName;
    }
    else {
        teamClass = teamName.split(' ').join('-');

    }
    console.log(teamClass);
    console.log(teamName);
    teamClass += " teams"
    switch (teamName) {
        case 'Alfa Romeo':
            img = alfaR;
            console.log(img)
            break;
        case 'Alpha Tauri':
            img = alphaT;
            console.log('hit AT')
            break;
        case 'Ferrari':
            img = ferrari;
            break;
        case 'HAAS':
            img = haas;
            break;
        case 'Mercedes':
            img = merc;
            break;
        case 'McLaren':
            img = mclaren;
            break;
        case 'Racing Point':
            img = racingPoint;
            break;
        case 'Red Bull':
            img = redBull;
            break;
        case 'Renault':
            img = renault;
            break;
        case 'Williams':
            img = williams;
            break;
    }

    const handleClick = (e) => {
        console.log(e.target.id)
        history.push(`/teams/${e.target.id}`);
    }

    return (

        <img className={teamClass} id={teamName} onClick={handleClick} src={img} />


    )
}

export default TeamIcon;