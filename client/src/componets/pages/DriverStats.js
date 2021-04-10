import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CareerStatRow from '../StatsComponents/CareerStatRow';
import './style.css'

function DriverStats() {
    const [drivers, setDrivers] = useState([]);
    const [driverSearch, setDriverSearch] = useState('');

    const getDrivers = async () => {
        if(driverSearch === ''){
            const driverList = await axios.get('/api/getAllDrivers')
            console.log(driverList.data);
            console.log(driverList.data[0].careerFastestLaps);
            setDrivers(driverList.data);
        }
        else{
            const filterd = await axios.get(`/api/drivers/${driverSearch}`);
            setDrivers(filterd.data);
        }

    }

    useEffect(() => {
        getDrivers();
    }, [driverSearch])

    return (
        <div >
            <div className='center'>
                <input className='driver-search' placeholder='Filter Drivers ex: Reagan G' onChange={(e) => setDriverSearch(e.target.value)}></input>

            </div>
            <div className='driver-stats-container'>
                <table className="table rounded table-hover table-responsive-lg">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Season Points</th>
                            <th scope="col">Season Wins</th>
                            <th scope="col">Season Fastest Laps</th>
                            <th scope="col">Career Points</th>
                            <th scope="col">Career Wins</th>
                            <th scope="col">Career Fastest Laps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver, i) =>
                            <tr>
                                <td>{driver.name}</td>
                                <td>{driver.points}</td>
                                <td>{driver.wins}</td>
                                <td>{driver.fastestLaps}</td>
                                <td>{driver.careerPoints}</td>
                                <td>{driver.careerWins}</td>
                                <td>{driver.careerFastestLaps}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )

}

export default DriverStats;