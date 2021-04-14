import React, { useState, useEffect } from 'react';
import {Card} from 'react-bootstrap'
import axios from 'axios';
import WDCTable from '../WDCTable';
import fs from 'fs';
import { Table, Tr, td } from 'reactable';

function DriverStandings({loggedIn, setLoggedIn}) {

    const [drivers, setdrivers] = useState([]);

    useEffect(() => {
        getStandings();
    }, [])

    const getStandings = async () => {
        const tmp = await axios.get('/api/WDC');
        let data = tmp.data;
        console.log(tmp.data);
        setdrivers(data);
    }
    // const getRaces = async () => {
    //     const response = await axios.get('/api/raceResults')
    //     console.log(response.data);
    // }

    // const Table = Reactable.Table;
    // const Tr = Reactable.Tr;
    // const td = Reactable.td;

    return (
        <Card body className='f1 box' style={{width: '800px', margin: 'auto', marginTop: '50px'}}>

            <table className='table table-responsive-lg' id='table'>
                <tr>
                    <th>Driver Name</th>
                    <th>Points</th>
                    <th>Wins</th>
                    <th>Fastest Laps</th>
                </tr>
                
                {drivers.map(driver => {
                    return (
                        <tr>
                            <td column='Driver Name'>{driver.name}</td>
                            <td column='Points'>{driver.points}</td>
                            <td column='Wins'>{driver.wins}</td>
                            <td column='Fastest Laps'>{driver.fastestLaps}</td>
                        </tr>)
                })}

            </table>
        </Card>
        // <WDCTable drivers={driverStandings}/>
    )
}

export default DriverStandings;