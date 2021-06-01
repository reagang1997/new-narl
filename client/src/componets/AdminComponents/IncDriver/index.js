import React from 'react';
import {Form, Col, Row} from 'react-bootstrap';

const IncDriver = () => {

    return ( <div></div>
        // <div style={{ marginLeft: '25%', marginRight: '25%' }}>
        //     <h3>Increment Driver Stats</h3>
        //     <Form>
        //         <Form.Row>
        //             <Col sm={2}>
        //                 <Form.Label>Select Driver</Form.Label>
        //             </Col>
        //         </Form.Row>
        //         <Form.Row>
        //             <Col sm={2}>
        //                 <Form.Control as='select'
        //                     value={selectedDriver}
        //                     onChange={(e) => setSelectedDriver(e.target.value)} >
        //                     {drivers.map(driver => <option id={driver._id} key={driver._id} value={driver._id}>{driver.name}</option>)}
        //                 </Form.Control>
        //             </Col>
        //         </Form.Row>
        //         <Form.Row>

        //             <Col sm={2} >
        //                 <Form.Label>Season Wins</Form.Label>
        //                 <Form.Control placeholder="Wins" style={{ width: '150px' }} onBlur={(e) => setStat('wins', e.target.value)} />
        //             </Col>
        //             <Col sm={2}>
        //                 <Form.Label>Season Points</Form.Label>

        //                 <Form.Control placeholder="Points" style={{ width: '150px' }} onBlur={(e) => setStat('points', e.target.value)} />
        //             </Col>
        //             <Col sm={2}>
        //                 <Form.Label>Season FL</Form.Label>

        //                 <Form.Control placeholder="Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('fastestLaps', e.target.value)} />
        //             </Col>
        //         </Form.Row>
        //         <Form.Row style={{ marginTop: '25px' }}>
        //             <Col sm={2} >
        //                 <Form.Label>Career Wins</Form.Label>
        //                 <Form.Control placeholder="Career Wins" style={{ width: '150px' }} onBlur={(e) => setStat('careerWins', e.target.value)} />
        //             </Col>
        //             <Col sm={2}>
        //                 <Form.Label>Career Points</Form.Label>

        //                 <Form.Control placeholder="Career Points" style={{ width: '150px' }} onBlur={(e) => setStat('careerPoints', e.target.value)} />
        //             </Col>
        //             <Col sm={2}>
        //                 <Form.Label>Career FL</Form.Label>

        //                 <Form.Control placeholder="Career Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('careerFastestLaps', e.target.value)} />
        //             </Col>
        //         </Form.Row>
        //         <Button variant="warning" style={{ marginTop: '10px' }} onClick={updateStats} >
        //             Update Driver
        //     </Button>
        //     </Form>
        // </div>
    )
}

export default IncDriver;