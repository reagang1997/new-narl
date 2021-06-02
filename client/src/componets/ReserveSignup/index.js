import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../theme/CustomButtons/Button'

import GridItem from '../theme/Grid/GridItem';
import GridContainer from '../theme/Grid/GridContainer';
const ReserveSignup = ({ reserveRsvp, driver }) => {

    const [openSeats, setOpenSeats] = useState([]);
    const [noOpen, setNoOpen] = useState(false);

    useEffect(() => {
        getOpenSeats();
    }, []);

    const getOpenSeats = async () => {
        const open = await axios.get('/api/openSeats');
        console.log(open.data)
        console.log(open.data);
        setOpenSeats(open.data)
        const seatCount = open.data.length;
        let found = 0;
        open.data.forEach(seat => {
            if (seat === null) {
                found += 1;
            }
        })
        if (found === seatCount) {
            setNoOpen(true);
        }
    }



    return (
        <Card body className='box f1' style={{ marginTop: '15px', marginBottom: '15px' }}>
            {driver.rsvp === 'Yes' ? <h1>You are Registered!</h1> :
                <div>
                    {noOpen ? <h1>There are no open seats</h1> : <h1>Avalible Seats For This Week</h1>}


                    {openSeats ? openSeats.map(seat => {
                        if (seat === null) { return }
                        return (<div>
                            {seat.numbers.map(number => {
                                return (
                                    <Card body className='shadow' style={{ marginTop: '5px' }}>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <h3 style={{ marginTop: '8px' }}> #{number}  {seat.team} </h3>

                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <div style={{ marginLeft: '250px' }}>
                                                    <Button style={{width: '165px'}} color='warning' value={seat.team} onClick={reserveRsvp} id={number}>Take #{number}</Button>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                        
                                    </Card>

                                )
                            }
                            )}
                        </div>)
                    }) : <div></div>}
                </div>}

        </Card>
    )
}

export default ReserveSignup;