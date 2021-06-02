import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamIcon from '../TeamIcon';
import { Card, Col, Row } from 'react-bootstrap';

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

    return (
        <div className='f1'>
            <Card body className='box  week-card' style={{ marginTop: '50px', marginBottom: '50px' }}>
                <h1 className='this-week'>Grid</h1>
                <p>Drivers: {driverCount}</p>
                {grid.map(driver => {
                    return (
                        <Card body className='shadow' style={{ width: '95%', margin: 'auto', marginTop: '5px' }}>
                            <Row>
                                <Col md={3}>
                                    <div  style={{marginLeft: '35px'}}>
                                        
                                    <TeamIcon teamName={driver.team}></TeamIcon>
                                    </div>

                                </Col>
                                <Col md={9}>
                                    <div style={{marginTop: '15px'}}>
                                    <span >#{driver.driverNumber}   {driver.name}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    )
                })}


            </Card>

        </div>
    )
}

export default CurrentGrid;