import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamIcon from '../TeamIcon';
import {Card} from 'react-bootstrap';

const CurrentGrid = () => {

    const [grid, setGrid] = useState([]);
    const [driverCount, setDriverCount] = useState(0);

    useEffect(() => {
        getGrid();
    }, []);

    const getGrid = async () => {
        const currentGrid = await axios.get('/api/currentGrid');
        setGrid(currentGrid.data);
        setDriverCount(currentGrid.data.length);
    }

    return(
        <div className='f1'>
            <Card body className='box  week-card' style={{marginTop: '50px', marginBottom: '50px'}}>
                <h1 className='this-week'>Grid</h1>
                <p>Drivers: {driverCount}</p>
                {grid.map(driver => {
                    return (
                        <Card body className='shadow' style={{width: '95%', margin: 'auto', marginTop: '5px'}}>
                            <TeamIcon teamName={driver.team}></TeamIcon>
                            <span>#{driver.driverNumber}   {driver.name}</span>
                        </Card>
                    )
                })}

                
            </Card>

        </div>
    )
}

export default CurrentGrid;