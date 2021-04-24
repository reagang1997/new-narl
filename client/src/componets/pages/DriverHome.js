import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TeamIcon from '../TeamIcon'
import { useHistory } from 'react-router-dom'
import RSVP from '../RSVP';
import ReserveSignup from '../ReserveSignup/ReserveSignup';
import AdminHome from './AdminHome';
import e from 'cors';

const DriverHome = ({loggedIn, driver, setDriver, guid, setGuid}) => {
    const [rsvp, setRsvp] = useState('');
    const [team, setTeam] = useState('');
    const [number, setNumber] = useState('')

    useEffect(() => {
    }, [rsvp]);

  
    const reserveRsvp = async (e)  => {
        const entry = {
            name: driver.name,
            team: e.target.value,
            driverNumber: e.target.id,
            guid: guid
        }
        console.log(entry);
        const addedEntry = await axios.post('/api/createEntry', entry);
        const tmpRsvp = { rsvp: 'Yes', guid: guid}
        const updatedRsvp = await axios.post(`/api/updateRSVP`, tmpRsvp);

    }

    const updateRsvp = async (e) => {
        setRsvp(e.target.innerHTML);
        const entry = {
            rsvp: e.target.innerHTML,
            guid: guid
        }
        const updated = await axios.post(`/api/updateRSVP`, entry);
        if(driver.team !== 'Reserve')
        if(e.target.innerHTML === 'Yes'){
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
            { driver ?
                <div className='f1' style={{ width: '1250px', margin: 'auto', marginTop: '25px' }} >

                    <h1 style={{ fontSize: '55px' }}>{driver.name}</h1>
                    {/* <h4><TeamIcon teamName={driver.team} /><span>{driver.team}</span></h4> */}
                    {driver.team !== 'Reserve' ? <RSVP setRsvp={setRsvp} updateRsvp={updateRsvp} driver={driver} rsvp={rsvp} /> : 
                    <ReserveSignup reserveRsvp={reserveRsvp} setTeam={setTeam} setNumber={setNumber}/>}


                </div > : <div></div>}
                {driver.admin ? <AdminHome></AdminHome> : <div></div>}
        </div>
    )
}

export default DriverHome;