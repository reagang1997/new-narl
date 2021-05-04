import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import './style.css'

const CurrentTrack = () => {

    const [currentTrack, setCurrentTrack] = useState({});

    useEffect(() => {
        getCurrentTrack();
    }, [])

    const getCurrentTrack = async () => {
        const track = await axios.get('/api/getCurrentTrack');
        console.log(track.data);
        setCurrentTrack(track.data);
    }

    return (
        <div className='f1'>
            <Card body className='box  week-card' style={{marginTop: '50px', marginBottom: '50px'}}>
                <h1 className='this-week'>This Weeks Race</h1>

                <h2>{currentTrack.name}</h2>
                <h3>Laps: {currentTrack.numLaps}</h3>
                <h3>Turns: {currentTrack.turns}</h3>
                <h3>Track Length: {currentTrack.trackLength} miles</h3>
                <h3>Start Time: 8PM CST</h3>
                <h3><a href={currentTrack.download} target='blank'>Download</a></h3>
            </Card>

        </div>
    )
}

export default CurrentTrack;
