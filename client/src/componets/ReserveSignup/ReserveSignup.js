import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

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
        <Card body className='box f1'>
            {driver.rsvp === 'Yes' ? <h1>You are Registered!</h1> :
                <div>
                    {noOpen ? <h1>There are no open seats</h1> : <h1>Avalible Seats For This Week</h1>}


                    {openSeats ? openSeats.map(seat => {
                        if (seat === null) { return }
                        return (<div><Card body>
                            <Row>
                                <Col md={9}>
                                    <h3> #{seat.driverNumber}  {seat.team} </h3>
                                </Col>
                                <Col md={3}>
                                    <Button variant='success' value={seat.team} onClick={reserveRsvp} id={seat.driverNumber}>Take #{seat.driverNumber}</Button>

                                </Col>
                            </Row>
                        </Card></div>)
                    }) : <div></div>}
                </div>}

        </Card>
    )
}

export default ReserveSignup;