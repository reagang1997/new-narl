import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CareerStatRow from '../StatsComponents/CareerStatRow';
import './style.css'

function DriverStats() {
    const [drivers, setDrivers] = useState([]);
    const [driverSearch, setDriverSearch] = useState('');

    const getDrivers = async () => {
        if(driverSearch === ''){
            const driverList = await axios.get('/api/allDrivers')
            console.log(driverList.data);
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
                            <th scope="col">POS</th>
                            <th scope="col">Name</th>
                            <th scope="col">Career Points</th>
                            <th scope="col">Career Wins</th>
                            <th scope="col">Career Fastest Laps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver, i) =>
                            <CareerStatRow
                                key={i}
                                name={driver.name}
                                careerPoints={driver.careerPoints}
                                careerWins={driver.careerWins}
                                careerFastestLaps={driver.careerFastestLaps}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )

}

export default DriverStats;