import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TeamIcon from '../TeamIcon'
import { useHistory } from 'react-router-dom'
import RSVP from '../RSVP';
import ReserveSignup from '../ReserveSignup/ReserveSignup';
import AdminHome from './AdminHome';
import e from 'cors';
import ReserveTeamSignup from '../ReserveTeamSignup';
import SeasonStats from '../StatsComponents/SeasonStats';
import CareerStats from '../StatsComponents/CareerStats';
import DriverHomeNav from '../DriverHomeNav';
import EditProfile from '../EditProfile';

const DriverHome = ({ loggedIn, driver, setDriver, guid, setGuid }) => {
    const [rsvp, setRsvp] = useState('');
    const [team, setTeam] = useState('');
    const [number, setNumber] = useState('')
    const [nav, setNav] = useState('Stats');




    useEffect(() => {

    }, [rsvp]);

    useEffect(() => {

    }, [driver]);

    const getRsvp = () => {
        setRsvp(driver.rsvp);
    }
    const reserveRsvp = async (e) => {
        const entry = {
            name: driver.name,
            team: e.target.value,
            driverNumber: e.target.id,
            guid: guid
        }
        console.log(entry);
        setDriver({ ...driver, rsvp: 'Yes' });
        const addedEntry = await axios.post('/api/createEntry', entry);
        const tmpRsvp = { rsvp: 'Yes', guid: guid }
        const updatedRsvp = await axios.post(`/api/updateRSVP`, tmpRsvp);

    }

    const updateRsvp = async (e) => {
        setDriver({ ...driver, rsvp: e.target.innerHTML });
        const entry = {
            rsvp: e.target.innerHTML,
            guid: guid
        }
        const updated = await axios.post(`/api/updateRSVP`, entry);
        if (driver.team !== 'Reserve')
            if (e.target.innerHTML === 'Yes') {
                const entry = {
                    guid: guid,
                    team: driver.team,
                    driverNumber: driver.driverNumber,
                    name: driver.name
                };
                const newEntry = await axios.post('/api/createEntry', entry);
                console.log(newEntry.data);
            }
        console.log(e.target.innerHTML);
    }

    return (
        <div>
            {console.log(driver)}

            { driver ?
                <div className='f1' style={{ width: '1350px', margin: 'auto', marginTop: '25px' }} >

                    <h1 id='white' style={{ fontSize: '55px' }}>{driver.name}</h1>
                    <h3 id='white'>{driver.team}</h3>
                    <h8 id='white'>Server Password: narlseason2</h8>
                    {/* <h4><TeamIcon teamName={driver.team} /><span>{driver.team}</span></h4> */}
                    <div style={{ width: 'fit-content', margin: 'auto', marginTop: '50px' }}>
                        <Row style={{ width: '1500px', marginLeft: '-200px' }}>
                            <Col lg={2}>
                                <DriverHomeNav  nav={nav} setNav={setNav} />
                            </Col>
                            {nav === 'Stats' ?
                                <div style={{marginLeft: '120px', }}>
                                    <Row style={{width: 'fit-content', margin: 'auto'}}>
                                        <Col lg={6}>
                                            <SeasonStats wins={driver.wins} pts={driver.points} fl={driver.fastestLaps}></SeasonStats>
                                        </Col>
                                        <Col lg={6}>
                                            <   CareerStats wins={driver.careerWins} pts={driver.careerPoints} fl={driver.careerFastestLaps}></CareerStats>
                                        </Col>
                                    </Row>
                                </div>
                                : <div></div>}
                            {nav === 'Registration' ?
                                <div style={{width: 'fit-content', margin: 'auto'}}>
                                    {
                                        driver.team !== 'Reserve' ? <RSVP setRsvp={setRsvp} updateRsvp={updateRsvp} driver={driver} rsvp={rsvp} /> :
                                            <div>
                                                <ReserveSignup reserveRsvp={reserveRsvp} setTeam={setTeam} setNumber={setNumber} driver={driver} />
                                                <ReserveTeamSignup driver={driver} setDriver={setDriver}></ReserveTeamSignup>
                                            </div>
                                    }
                                </div> : <div></div>
                            }
                            {nav === 'Edit Profile' ?
                                <div style={{width: 'fit-content', margin: 'auto', marginTop: '0px'}}>
                                    {
                                        <EditProfile driver={driver} setDriver={setDriver}/>
                                    }
                                </div> : <div></div>
                            }



                        </Row>
                    </div>



                </div > : <div></div>}

            {driver.admin ? <AdminHome></AdminHome> : <div></div>}
        </div>
    )
}

export default DriverHome;