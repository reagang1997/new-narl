import React, { useState, useEffect } from 'react';
import { Button, Alert, Card } from 'react-bootstrap';
import TeamIcon from '../TeamIcon';
import axios from 'axios';
import Sectors from '../Sectors';
import API from '../../utils/API';

function PracticeResults({ loggedIn, setLoggedIn }) {

    const [practiceResults, setPracticeResults] = useState([]);
    const [trackSectors, setTrackSectors] = useState({s1: 0, s2: 0, s3: 0});
    const [hit, setHit] = useState(0)
    const [p1, setP1] = useState(0);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        getPractice();
    }, [hit])

    const getPractice = async () => {
        const practice = await axios.get('/api/practiceResults');
        const sectors = await axios.get('/api/getTrackSectors');
        console.log('HITTTTT' + sectors.data);
        setTrackSectors({s1: sectors.data.pSector1, s2: sectors.data.pSector2, s3: sectors.data.pSector3});
        if(hit === 0){
            setHit(hit+1)
        }
        console.log(practice);
        setPracticeResults(practice.data);
        setP1(practice.data[0].rawLapTime);
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
                       
                        let split;
                        if (i > 0){
                            split = driver.rawLapTime - p1;
                            split = getSetor(split);
                        }
                        if (driver.rawLapTime === 99999999999) return;
                        let sector1color, sector2color, sector3color;
                        let time = getFormatted(driver.rawLapTime);
                        console.log(trackSectors.s1);
                        if(driver.sector1time === trackSectors.s1){
                             sector1color = 'pink'
                             console.log('hit')
                        }
                        else if(driver.sector1time === driver.sector1pb){
                            console.log(driver.sector1time)
                            console.log(driver.sector1pb)
                             sector1color = 'green'
                        }
                        else{
                            sector1color = 'yellow'
                        }
                        if(driver.sector2time === trackSectors.s2){
                             sector2color = 'pink'
                        }
                        else if(driver.sector2time === driver.sector2pb){
                             sector2color = 'green'
                        }
                        else{
                             sector2color = 'yellow'
                        }

                        if(driver.sector3time === trackSectors.s3){
                             sector3color = 'pink'
                        }
                        else if(driver.sector3time === driver.sector3pb){
                             sector3color = 'green'
                        }
                        else{
                             sector3color = 'yellow'
                        }
                        let sector1Time = getSetor(driver.sector1time);
                        let sector2Time = getSetor(driver.sector2time);
                        let sector3Time = getSetor(driver.sector3time);

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
                                <td>{time}<br />{i > 0 ? <div>+{split}</div> : ''}<Sectors
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
