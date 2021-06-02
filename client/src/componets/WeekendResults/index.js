import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const WeekendResults = () => {

    const [practiceResults, setPR] = useState([]);
    const [p1, setP1] = useState(0)

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async () => {
        const tmpPR = await axios.get('/api/currentPracticeResults');
        setPR(tmpPR.data);
    }

    const getFormatted = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        const formatted = mins + ':' + secs + ':' + ms;
        return formatted;
    }
    return (
        <div className='f1' style={{ width: 'fit-content', margin: 'auto' }}>
            <Card body className='box'>
                <h1>Race Results</h1>
            </Card>
            <Card body className='box'>
                <h1>Qualifying Results</h1>
            </Card>
            <Card body className='box' style={{width: '1250px'}}>
                <h1>Practice Results</h1>
                {practiceResults ? 
                <div>
                    {practiceResults.map((result, i) => {
                        let split;
                        if(i === 0){
                            setP1(result.rawLapTime)
                        }
                        else{
                            split = p1 - result.rawLapTime;
                            split = getFormatted(split);
                        }
                        const lapTime = getFormatted(result.rawLapTime);
                        return (
                            <Card body style={{marginTop: '15px'}}>
                                <Row>
                                    <Col md={3}>
                                        {i + 1}
                                    </Col>
                                    <Col md={3}>
                                        {result.driverName}
                                    </Col>
                                    <Col md={3}>
                                        {lapTime}
                                    </Col>
                                    {i > 0 ? 
                                    <Col md={3}>
                                        {split}
                                    </Col>  : <div/>  
                                    }
                                </Row>
                            </Card>
                        )
                    })}
                </div> : <div/>
            }
            </Card>
        </div>
    )
}

export default WeekendResults;