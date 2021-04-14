import React from 'react';
import path from 'path';
import alphaT from './img/alphatauri-head.png'
import alfaR from './img/alfa.png'
import ferrari from './img/ferrari-header.png'
import haas from './img/haas-head.png'
import mer from './img/mb.png'
import mclaren from './img/mc.png'
import racingPoint from './img/racingpoint-head.png'
import redBull from './img/redbull-head.png'
import renault from './img/renault-head.png'
import williams from './img/williams-head.png'

function TeamLogo({ teamName }) {
    let img;
    console.log(teamName);
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
            img = mer;
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
    return (
        <div >
            <img  src={img}/>

        </div>
    )
}

export default TeamLogo;