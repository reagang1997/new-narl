import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const ReserveTeamSignup = ({driver, setDriver}) => {

    const [openSeats, setOpenSeats] = useState([]);

    useEffect(() => {
        getOpen();
    }, []);

    const getOpen = async () => {
        const open = await axios.get('/api/openTeamSeats');
        console.log(open.data);
        setOpenSeats(open.data);
    }

    const joinTeam = async (e) => {
        const tmp = {
            guid: driver.guid,
            driverNumber: e.target.id,
            team: e.target.value
        }

        const updated = await axios.put('/api/joinTeam', tmp);
        setDriver({...driver, team: tmp.team, driverNumber: tmp.driverNumber});
    }

    return (
        <div>
            <Card body className='box'>
                <h1>Join A Team Today!</h1>
                <div>
                    {openSeats.length === 0 ? <h1>There are no open seats</h1> : <h1>Avalible Seats For This Week</h1>}


                    {openSeats ? openSeats.map(seat => {
                        if (seat === null) { return }
                        return (<div>
                            {seat.numbers.map(number => {
                                return (
                                    <Card body className='shadow' style={{ marginTop: '5px' }}>
                                        <Row>
                                            <Col md={9}>
                                                <h3> #{number}  {seat.team} </h3>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant='success' value={seat.team} id={number} onClick={joinTeam}>Join {seat.team} #{number}</Button>

                                            </Col>
                                        </Row>
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