import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

    const refresh = async (e) => {
        const newPR = await axios.get('/api/lastPractice');
        console.log(newPR);
        setStatus(newPR.status)
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
        <div>
            {/* {status === 204 ? 
                <Alert variant='Warning'>Pratice Is Up-To-Date</Alert>   : <div></div> 
            } */}
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
                        {practiceResults.map((driver, i) => {
                            if (driver.rawLapTime === 99999999999) return;
                            let time = getFormatted(driver.rawLapTime);

                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{driver.teamName}</td>
                                    <td>{driver.driverName}</td>
                                    <td>{time}</td>
                                    <td>{driver.tire}</td>
                                    <td>{driver.laps}</td>
                                </tr>
                            )

                        })}


                    </tbody>
                </table>
            </div>
            <button className='btn warning' onClick={refresh}>Refresh</button>
        </div>

    )
}

export default PracticeResults;