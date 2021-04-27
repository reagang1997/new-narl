import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamIcon from '../TeamIcon';
import {Card} from 'react-bootstrap';

const CurrentGrid = () => {

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        getGrid();
    }, []);

    const getGrid = async () => {
        const currentGrid = await axios.get('/api/currentGrid');
        setGrid(currentGrid.data);
    }

    return(
        <div className='f1'>
            <Card body className='box  week-card' style={{marginTop: '50px', marginBottom: '50px'}}>
                <h1 className='this-week'>This Weeks Grid</h1>
                {grid.map(driver => {
                    return (
                        <Card body className='box' style={{width: 'fit-content'}}>
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