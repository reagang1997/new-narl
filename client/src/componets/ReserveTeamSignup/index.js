import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../theme/CustomButtons/Button'
import GridItem from '../theme/Grid/GridItem';
import GridContainer from '../theme/Grid/GridContainer';

const ReserveTeamSignup = ({ driver, setDriver }) => {

    const [openSeats, setOpenSeats] = useState([]);

    useEffect(() => {
        getOpen();
        console.log(driver);
    }, []);

    useEffect(() => {
        console.log('changed driver');
        console.log(driver)
    }, [driver])

    const getOpen = async () => {
        const open = await axios.get('/api/openTeamSeats');
        setOpenSeats(open.data);
    }

    const joinTeam = async (e) => {
        console.log('HIT')
        if(e.target.parentElement.id === '' || e.target.parentElement.value === null) {
            return alert("Please Try Again")
        }
        const tmp = {
            guid: driver.guid,
            driverNumber: e.target.parentElement.id,
            team: e.target.parentElement.value
        }
        console.log(tmp);
        setDriver({ ...driver, team: tmp.team, driverNumber: tmp.driverNumber });
        console.log(driver)
        const updated = await axios.put('/api/joinTeam', tmp);
    }

    return (
        <div>
            <Card body className=' f1 box' style={{ marginTop: '0px', marginBottom: '15px' }}>
                <h1>Join A Team Today!</h1>
                <div>



                    {openSeats ? openSeats.map(seat => {
                        if (seat === null) { return }

                        return (<div>
                            {seat.numbers.map(number => {
                                console.log(number);
                                return (
                                    <Card body className='shadow' style={{ marginTop: '5px' }}>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={8}>
                                                <h3 style={{marginTop: '8px'}}> #{number}  {seat.team} </h3>

                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={8}>
                                                <div style={{marginLeft: '250px'}}>
                                                    <Button color='warning' value={seat.team} id={number} onClick={joinTeam}>Join {seat.team} #{number}</Button>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                        
                                    </Card>

                                )
                            }
                            )}
                        </div>)
                    }) : <div></div>}
                </div>
            </Card>
        </div>
    )
}

export default ReserveTeamSignup;