import React from 'react';
import './style.css'

const Sectors = ({sector1T, sector1C, sector2T, sector2C, sector3T, sector3C}) => {

    return (
        <div>
            <span style={{fontSize: '10px', marginLeft: '-1px'}} className={sector1C}>{sector1T}</span>
            <br/>
            <span style={{fontSize: '10px', marginLeft: '-1px'}} className={sector2C}>{sector2T}</span>
            <br/>
            <span style={{fontSize: '10px', marginLeft: '-1px'}} className={sector3C}>{sector3T}</span>
        </div>
    )
}

export default Sectors;