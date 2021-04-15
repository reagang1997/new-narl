import React, { useState, useEffect } from 'react';
import { Button, Alert, Card } from 'react-bootstrap';
import TeamIcon from '../TeamIcon';
import axios from 'axios';
import Sectors from '../Sectors';
import API from '../../utils/API';

function PracticeResults({ loggedIn, setLoggedIn }) {

    const [practiceResults, setPracticeResults] = useState([]);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        getPractice();
    }, [])

    const getPractice = async () => {
        const practice = await axios.get('/api/practiceResults');
        console.log(practice);
        setPracticeResults(practice.data);
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

    const getSetor = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        const formatted = secs + '.' + ms;
        return formatted;
    }
    return (<div>
        {status === 204 ?
            <Alert variant='Warning'>Pratice Is Up-To-Date</Alert> : <div></div>
        }
        <Card body className='f1 box practice-card'>

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
                        let sector1Time = getSetor(driver.sector1time);
                        let sector2Time = getSetor(driver.sector2time);
                        let sector3Time = getSetor(driver.sector3time);
                        let sector1color = driver.sector1color;
                        let sector2color = driver.sector2color;
                        let sector3color = driver.sector3color;
                        console.log(sector1Time, sector2color);
                        let pos;
                        if (i === 0) {
                            pos = 'first'
                        }
                        else if (i === 1) {
                            pos = 'second'
                        }
                        else if (i === 2) {
                            pos = 'third'
                        }
                        return (
                            <tr>
                                <td className={pos}>{i + 1}</td>
                                <td><TeamIcon teamName={driver.teamName} /></td>
                                <td>{time}<br /><Sectors
                                    sector1T={sector1Time}
                                    sector2T={sector2Time}
                                    sector3T={sector3Time}
                                    sector1C={sector1color}
                                    sector2C={sector2color}
                                    sector3C={sector3color}
                                />
                                </td>
                                <td>{driver.driverName}</td>
                                <td>{driver.tire}</td>
                                <td>{driver.laps}</td>
                            </tr>
                        )

                    })}


                </tbody>
            </table>
        </Card>
    </div>



    )
}

export default PracticeResults;
