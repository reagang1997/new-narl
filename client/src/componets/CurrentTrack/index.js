import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CurrentTrack = () => {

    const [currentTrack, setCurrentTrack] = useState({});

    useEffect(() => {
        getCurrentTrack();
    }, [])

    const getCurrentTrack = async () => {
        const track = await axios.get('/api/getCurrentTrack');
        console.log(track.data); 
        setCurrentTrack(track.data.track);   
    }
    
    return(
        <div style={{width: 'fit-content', margin: '0 auto'}}>
            <h1>{currentTrack.name}</h1>
            <h3>Laps: {currentTrack.numLaps}</h3>
            <h3>Turns: {currentTrack.turns}</h3>
            <h3>Track Length: {currentTrack.trackLength} miles</h3>
            <h3><a href={currentTrack.download} target='blank'>Download</a></h3>
        </div>
    )
}

export default CurrentTrack;