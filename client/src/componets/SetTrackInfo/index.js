import React, { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';

const SetTrackInfo = () => {
    const [tracks, setTracks] = useState([]);
    const [newTrack, setNewTrack] = useState({
        name: "",
        trackLength: 0,
        turns: 0,
        numLaps: 0,
        download: "",
        config: '',
        fileName: ''
    });
    const [currentTrack, setCurrentTrack] = useState('');

    useEffect(() => {
        getTracks();
    }, []);

    const createTrack = async () => {
        console.log(newTrack.name);
        const createdTrack = await axios.post('/api/newTrack', newTrack);
        setNewTrack({
            name: "",
            trackLength: 0,
            turns: 0,
            numLaps: 0,
            download: ""
        })
    }

    const getTracks = async () => {
        const allTracks = await axios.get('/api/allTracks');
        console.log(allTracks.data)
        setTracks(allTracks.data);
    }

    const setTrack = async (e) => {
        console.log('selected track');
        const trackID = e.target.value;

        const setTrack = await axios.put(`/api/setCurrentTrack/${currentTrack}`);
    }

    return (
        <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            <h3>Add Track Information</h3>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Row>
                        <Col sm={2}>
                            <Form.Label>Track Name</Form.Label>
                            <Form.Control style={{ width: '250px' }} placeholder="Enter Track Name" onChange={e => setNewTrack({ ...newTrack, name: e.target.value })} />

                        </Col>
                    </Form.Row>

                    <Form.Row style={{ marginTop: '25px' }}>
                        <Col sm={3}>
                            <Form.Label>Track Length</Form.Label>
                            <Form.Control style={{ width: '200px' }} placeholder="Track Length (Miles)" onChange={e => setNewTrack({ ...newTrack, trackLength: e.target.value })} />

                        </Col>
                        <Col sm={3}>
                            <Form.Label>Number of Turns</Form.Label>
                            <Form.Control style={{ width: '200px' }} placeholder="Number of Turns" onChange={e => setNewTrack({ ...newTrack, turns: e.target.value })} />

                        </Col>
                        <Col sm={3}>
                            <Form.Label>Number of Laps</Form.Label>
                            <Form.Control style={{ width: '200px' }} placeholder="Number of Laps" onChange={e => setNewTrack({ ...newTrack, numLaps: e.target.value })} />

                        </Col>
                        <Col sm={3}>
                            <Form.Label>Download Link</Form.Label>
                            <Form.Control style={{ width: '200px' }} placeholder="Download Link" onChange={e => setNewTrack({ ...newTrack, download: e.target.value })} />

                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Col md={3}>
                            <Form.Label>Track File Name</Form.Label>
                            <Form.Control style={{ width: '200px' }} placeholder="Track File Name" onChange={e => setNewTrack({ ...newTrack, fileName: e.target.value })} />
                        </Col>
                        <Col md={3}>
                            <Form.Label>Track Config</Form.Label>
                            <Form.Control style={{ width: '200px' }} placeholder="Track Config" onChange={e => setNewTrack({ ...newTrack, config: e.target.value })} />
                        </Col>
                    </Form.Row>

                </Form.Group>
                <Button variant="warning" onClick={createTrack}>
                    Add Track
                    </Button>
            </Form>
            <h3 style={{ marginTop: '20px' }}>Set This Weeks Track</h3>
            <Form.Control as='select' onChange={(e) => setCurrentTrack(e.target.value)}>
                <option>Select Track</option>
                {tracks.map(track => {
                    return <option value={track._id}>{track.name}</option>
                })}
            </Form.Control>
            <Button variant='warning' style={{ marginTop: '15px', marginBottom: '200px' }} onClick={setTrack}>Set Track</Button>
        </div>
    )
}

export default SetTrackInfo;
