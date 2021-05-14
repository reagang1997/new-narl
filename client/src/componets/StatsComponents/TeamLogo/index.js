import React from 'react';
import path from 'path';
import alphaT from './img/alphatauri-head.png'
import alfaR from './img/alfa.png'
import ferrari from './img/ferrari-header.png'
import haas from './img/haas-head.png'
import mer from './img/mb.png'
import mclaren from './img/mc.png'
import astonmartin from './img/astonmartin-head.png'
import redBull from './img/redbull-head.png'
import alpine from './img/alpine-head.png'
import williams from './img/williams-head.png'
import './style.css';

function TeamLogo({ teamName }) {
    let img;
    let id;
    console.log(teamName);
    // const id = teamName.split(' ');
    console.log(teamName);
    switch (teamName) {
        case 'Alfa Romeo':
            img = alfaR;
            id = 'Alfa-Romeo';
            console.log(img)
            break;
        case 'Alpha Tauri':
            img = alphaT;
            id = 'Alpha-Tauri';
            console.log('hit AT')
            break;
        case 'Ferrari':
            img = ferrari;
            id = 'Ferrari-head';
            break;
        case 'HAAS':
            img = haas;
            id = 'HAAS-head';
            break;
        case 'Mercedes':
            img = mer;
            id = 'Mercedes-head';
            break;
        case 'McLaren':
            img = mclaren;
            id = 'McLaren-head';
            break;
        case 'Aston Martin':
            img = astonmartin;
            id = 'Aston-Martin';
            break;
        case 'Red Bull':
            img = redBull;
            id = 'Red-Bull';
            break;
        case 'Alpine':
            img = alpine;
            id = 'Alpine-head';
            break;
        case 'Williams':
            img = williams;
            id = 'Williams-head';
            break;
    }
    return (
        <div >
            <img id={id} src={img}/>

        </div>
    )
}

export default TeamLogo;