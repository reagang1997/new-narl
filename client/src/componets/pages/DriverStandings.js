import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WDCTable from '../WDCTable';
import fs from 'fs';
import {Table, Tr, Td} from 'reactable';

function DriverStandings() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        async function getStandings(){
            const tmp = await axios.get('/api/WDC');
            console.log(tmp.data);
            setDrivers(tmp.data);
        }
        getStandings();
    }, [])

    // const getRaces = async () => {
    //     const response = await axios.get('/api/raceResults')
    //     console.log(response.data);
    // }

    // const Table = Reactable.Table;
    // const Tr = Reactable.Tr;
    // const Td = Reactable.Td;

    return (
        <div>
            <Table className='table' id='table'>
                {drivers.map(driver => {
                    return (
                        <Tr>
                            <Td column='Driver Name'>{driver.name}</Td>
                            <Td column='Points'>{driver.points}</Td>
                            <Td column='Wins'>{driver.wins}</Td>
                            <Td column='Fastest Laps'>{driver.fastestLaps}</Td>
                        </Tr>
                    )
                })}

            </Table>
        </div>
        // <WDCTable drivers={driverStandings}/>
    )
}

export default DriverStandings;