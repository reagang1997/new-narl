import React, { useState, useEffect } from 'react';
import { Nav, Form, Button, Col, ToggleButton, ToggleButtonGroup, Card } from 'react-bootstrap';
import axios from 'axios';



const SetTeam = () => {

    const [selectedDriver, setSelectedDriver] = useState(''); //stores driver id
    const [selectedTeam, setSelectedTeam] = useState('');
    const [stats, setStats] = useState([]);
    const [added, setAdded] = useState(false);
    const [teams, setTeams] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [teamDrivers, setTeamDrivers] = useState([])
    const [currentTeam, setCurrentTeam] = useState([]);

    useEffect(() => {

        getDrivers();
        getTeams();
        getTeamData();
    }, [selectedTeam]);

    const updateStats = async (e) => {
        
        if (added){
            let tmpStat = {
                stat: 'addDriver',
                value: selectedDriver
            }
            setStats([...stats, tmpStat])
        }

        stats.forEach(async (stat) => {
            const updatedResult = await axios.put(`/api/SetTeamStats/${selectedTeam}`, stat);
            console.log(updatedResult);
        });
        setStats([]);
        setSelectedDriver('');
        setSelectedTeam('');
        setAdded(false);


    }

    const getTeamData = async () => {
        if(selectedTeam.length > 1){
            const team = await axios.get(`/api/findTeamDrivers/${selectedTeam}`);
            console.log(team.data.drivers)
            setTeamDrivers(team.data);
        }
        
    }

    const setStat = (statName, value) => {
        let foundDupe = false;
        const filteredStats = stats.map(stat => {
            if (stat.statName === statName) {
                foundDupe = true;
                stat.value = value;
                return stat;
            }
            else {
                return stat;
            }
        })
        if (foundDupe) {
            setStats(filteredStats);
        }
        else {
            const tmpStat = {
                stat: statName,
                value: value
            }

            setStats([...stats, tmpStat]);
        }
    }

    const getDrivers = async () => {
        const driversTmp = await axios.get('/api/getAllDrivers');
        setDrivers(driversTmp.data);
        console.log(drivers);
    }

    const getTeams = async () => {
        const tmpTeams = await axios.get('/api/getAllTeams');
        setTeams(tmpTeams.data);
        console.log(teams);
    }

    return (
        <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <h3>Set Team Stats</h3>
            <Form>
                <Form.Row>
                    <Col sm={2}>
                        <Form.Label>Select Team</Form.Label>
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Add Driver</Form.Label>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col sm={2}>
                        <Form.Control as='select'
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            value={selectedTeam}
                        >
                            <option>Select Team</option>
                            {teams.map(team => <option id={team._id} key={team._id} value={team._id}>{team.name}</option>)}
                        </Form.Control>
                    </Col>
                    <Col sm={2}>
                        <Form.Control as='select'
                            onChange={(e) => {
                                setAdded(true);
                                setSelectedDriver(e.target.value)
                                setStat('addDriver', e.target.value);
                            }}
                            value={selectedDriver}
                        >
                            <option>Select Driver</option>

                            {drivers.map(driver => <option id={driver._id} key={driver._id} value={driver._id}>{driver.name}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col sm={2} >
                        <Form.Label>Season Wins</Form.Label>
                        <Form.Control placeholder="Wins" style={{ width: '150px' }} onBlur={(e) => setStat('wins', e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Season Points</Form.Label>

                        <Form.Control placeholder="Points" style={{ width: '150px' }} onBlur={(e) => setStat('points', e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Season FL</Form.Label>

                        <Form.Control placeholder="Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('fastestLaps', e.target.value)} />
                    </Col>
                </Form.Row>
                <Form.Row style={{ marginTop: '25px' }}>
                    <Col sm={2} >
                        <Form.Label>History Wins</Form.Label>
                        <Form.Control placeholder="History Wins" style={{ width: '150px' }} onBlur={(e) => setStat('historyWins', e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>History Points</Form.Label>

                        <Form.Control placeholder="History Points" style={{ width: '150px' }} onBlur={(e) => setStat('historyPoints', e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>History FL</Form.Label>

                        <Form.Control placeholder="History Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('historyFastestLaps', e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Constructor Champs</Form.Label>

                        <Form.Control placeholder="Constructor Champs" style={{ width: '150px' }} onBlur={(e) => setStat('wcc', e.target.value)} />
                    </Col>
                </Form.Row>
                <Button variant="warning" onClick={updateStats} style={{ marginTop: '10px' }}>
                    Set Driver
                        </Button>
            </Form>
            <div style={{marginTop: '25px'}}>
                <h3>Current Drivers</h3>
                
            </div>
        </div>
    )
}

export default SetTeam;