import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WDCTable from '../WDCTable';
import fs from 'fs';

function DriverStandings() {

    const [driverStandings, setDriverStandings] = useState([]);

    useEffect(() => {
        async function getStandings(){
            const drivers = await axios.get('/api/WDC');
            console.log(drivers.data);
            setDriverStandings(drivers.data);
        }
        getStandings();
    }, [])

    const getRaces = async () => {
        const response = await axios.get('http://localhost:8080/api/raceResults')
        console.log(response.data);
    }

    return (
        <WDCTable drivers={driverStandings}/>
    )
}

export default DriverStandings;