import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../utils/API';

function PracticeResults() {

    const [practiceResults, setPracticeResults] = useState([]);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        getPractice();
    }, [status])

    const getPractice = async () => {
        const practice = await axios.get('/api/practiceResults');
        console.log(practice);
        setPracticeResults(practice.data);
    }
    return (

        <div className='practice-container'>

            <table className="table rounded table-hover table-responsive-lg">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Team</th>
                        <th scope="col">Time</th>
                        <th scope="col">Name</th>
                        <th scope="col">Tire</th>
                        <th scope="col">Laps</th>
                    </tr>
                </thead>
                <tbody>
                    {practiceResults.map((driver, i) =>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{driver.driverName}</td>
                            <td>{driver.teamName}</td>
                            <td>{driver.rawLapTime}</td>
                            <td>{driver.tire}</td>
                            <td>{driver.laps}</td>
                        </tr>
                    )}


                </tbody>
            </table>

        </div>

    )
}

export default PracticeResults;