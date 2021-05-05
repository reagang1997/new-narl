import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function CareerStats({ wins, fl, pts }) {
    return (
        <Card className='box f1' style={{width: '500px'}}>
            <div className='stats-container' >
                <h1>Career Stats</h1>
                <Row>
                    <Col md={5}>
                        <h2>Points:</h2>
                    </Col>
                    <Col md={4}>
                        <h2>{pts}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h2>Wins:</h2>
                    </Col>
                    <Col md={4}>
                        <h2>{wins}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <h3>Fastest Laps:</h3>
                    </Col>
                    <Col md={4}>
                        <h2>{fl}</h2>
                    </Col>
                </Row>
                </div>
        </Card>
    )
}

export default CareerStats;