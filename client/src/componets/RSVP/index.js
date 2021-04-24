import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const RSVP = ({ setRsvp, updateRsvp, driver, rsvp }) => {

    useEffect(() => {

    }, [rsvp])

    return (
        <div>{driver.rsvp === '' ?
            <Card body className='box' style={{ width: '500px', paddingBottom: '-50px' }}>
                <h3>Making it to this weeks race?</h3>
                <Row>
                    <Col md={4}>
                        <Button variant='success' onClick={updateRsvp}>Yes</Button>
                    </Col>
                    <Col md={4}>
                    </Col>
                    <Col md={4}>
                        <Button variant='danger' style={{ marginLeft: '77px' }} onClick={updateRsvp}>No</Button>
                        <p style={{ fontSize: '10px' }}>Let a reserve driver take your seat!</p>
                    </Col>
                </Row>
            </Card>
            : <div>
                <Card body className='box' style={{ width: '500px', paddingBottom: '-50px' }}>
                    {driver.rsvp === 'Yes' ?
                        <div>
                            <h3>You are registered for the race!</h3>
                        </div> :
                        <div>
                            <h3>You are not attending this week</h3>
                        </div>}
                </Card></div>}

        </div>
    )

}

export default RSVP;