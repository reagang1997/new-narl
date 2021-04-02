import React, { useEffect, useState } from 'react';
import { Nav, Form, Button, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Login from '../Login'
import axios from 'axios';

const AdminHome = () => {
    const [selection, setSelection] = useState('');
    const [stats, setStats] = useState([])
    const [newDriver, setNewDriver] = useState({ name: '' });
    const [newTeam, setNewTeam] = useState({ name: '' })
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [checkValue, setValue] = useState([1, 3])
    const [selectedDriver, setSelectedDriver] = useState(''); //stores driver id
    const [selectedTeam, setSelectedTeam] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {

        getDrivers();
        getTeams();
    }, [selection]);

    const addTeam = async () => {
        const addedTeam = await axios.post('/api/CreateNewTeam', newTeam)
        console.log(addedTeam);
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

    const addDriver = async () => {
        const addedDriver = await axios.post('/api/CreateNewDriver', newDriver);
        console.log(addedDriver);
    };

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

    const updateStats = async (e) => {
        console.log(selection.indexOf('Inc'));
        if (selection.indexOf('Driver') >= 0) {
            console.log('driver');
            if (selection.indexOf('Inc') != -1) {
                stats.forEach(async (stat) => {
                    const updatedResult = await axios.put(`/api/IncDriverStats/${selectedDriver}`, stat);
                    console.log(updatedResult);
                })
            }
            else {

                console.log(stats)
                stats.forEach(async (stat) => {

                    const updatedResult = await axios.put(`/api/SetDriverStats/${selectedDriver}`, stat);
                    console.log('set');
                    console.log(updatedResult);
                })
            }
        }

        else {
            if(selection.indexOf('Inc') != -1){
                stats.forEach(async (stat) => {
                    const updatedResult = await axios.put(`/api/IncTeamStats/${selectedTeam}`, stat);
                    console.log(updatedResult);
                })
            }
            else{
                stats.forEach(async (stat) => {
                    const updatedResult = await axios.put(`/api/SetTeamStats/${selectedTeam}`, stat);
                    console.log(updatedResult);
                })
            }
        }

        setStats([]);

    }

    return (
        <div>
            {loggedIn ? <div>
            <Nav defaultActiveKey="/home" className="justify-content-center">
                <Nav.Link href="/adminHome">Admin Home</Nav.Link>
                <Nav.Link eventKey="link-1" onClick={(e) => setSelection(e.target.innerHTML)}>Add Driver</Nav.Link>
                <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)} >Add Team</Nav.Link>
                <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Inc Driver Stats</Nav.Link>
                <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Set Driver Stats</Nav.Link>
                <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Inc Team Stats</Nav.Link>
                <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Set Team Stats</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
            </Nav.Link>
            </Nav>
            {/* Good */}
            {selection === "Add Driver" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                <h3>Add Driver</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Driver Name</Form.Label>
                        <Form.Control style={{ width: '250px' }} placeholder="Enter Driver Name" onBlur={(e) => setNewDriver({ name: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={addDriver}>
                        Add Driver
                    </Button>
                </Form>
            </div> : <div></div>}
            {/* Good */}
            {selection === "Add Team" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                <h3>Add Team</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control style={{ width: '250px' }} type="email" placeholder="Enter Team Name" onBlur={(e) => setNewTeam({ name: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={addTeam}>
                        Add Team
                    </Button>
                </Form>
            </div> : <div></div>}
            {/* Good */}
            {selection === "Inc Driver Stats" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                <h3>Increment Driver Stats</h3>
                <Form>
                    <Form.Row>
                        <Col sm={2}>
                            <Form.Label>Select Driver</Form.Label>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col sm={2}>
                            <Form.Control as='select'
                                value={selectedDriver}
                                onChange={(e) => setSelectedDriver(e.target.value)} >
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
                            <Form.Label>Career Wins</Form.Label>
                            <Form.Control placeholder="Career Wins" style={{ width: '150px' }} onBlur={(e) => setStat('careerWins', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Career Points</Form.Label>

                            <Form.Control placeholder="Career Points" style={{ width: '150px' }} onBlur={(e) => setStat('careerPoints', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Career FL</Form.Label>

                            <Form.Control placeholder="Career Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('careerFastestLaps', e.target.value)} />
                        </Col>
                    </Form.Row>
                    <Button variant="warning" style={{ marginTop: '10px' }} onClick={updateStats} >
                        Update Driver
                        </Button>
                </Form>
            </div> : <div></div>}
            {/* Good */}
            {selection === "Set Driver Stats" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                <h3>Set Driver Stats</h3>
                <Form>
                    <Form.Row>
                        <Col sm={2}>
                            <Form.Label>Select Driver</Form.Label>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col sm={2}>
                            <Form.Control as='select'
                                value={selectedDriver}
                                onChange={(e) => setSelectedDriver(e.target.value)}>

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
                            <Form.Label>Career Wins</Form.Label>
                            <Form.Control placeholder="Career Wins" style={{ width: '150px' }} onBlur={(e) => setStat('careerWins', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Career Points</Form.Label>

                            <Form.Control placeholder="Career Points" style={{ width: '150px' }} onBlur={(e) => setStat('careerPoints', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Career FL</Form.Label>

                            <Form.Control placeholder="Career Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('careerFastestLaps', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Driver Champs</Form.Label>

                            <Form.Control placeholder="Driver Champs" style={{ width: '150px' }} onBlur={(e) => setStat('wdc', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Construct Champs</Form.Label>

                            <Form.Control placeholder="Construct Champs" style={{ width: '150px' }} onBlur={(e) => setStat('wcc', e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Form.Label>Is Active</Form.Label>
                            <ToggleButtonGroup type='checkbox' value={checkValue} onChange={(val) => {
                                setValue(val);
                                console.log(val[2]);
                                if (val[2] === true) {
                                    const activity = { stat: 'isActive', value: true };
                                    setStats([...stats, activity]);


                                }
                                else {
                                    const activity = { stat: 'isActive', value: false };
                                    setStats([...stats, activity]);

                                }
                            }} >
                                <ToggleButton type='radio' value={false} >Not Active</ToggleButton>
                                <ToggleButton type='radio' value={true}>Active</ToggleButton>
                            </ToggleButtonGroup>


                        </Col>
                    </Form.Row>
                    <Button variant="warning" style={{ marginTop: '10px' }} onClick={updateStats}>
                        Set Driver
                        </Button>
                </Form>
            </div> : <div></div>
            }
            {selection === "Inc Team Stats" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                    <h3>Increment Team Stats</h3>
                    <Form>
                        <Form.Row>
                            <Col sm={2}>
                                <Form.Label>Select Team</Form.Label>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm={2}>
                                <Form.Control as='select'
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                value={selectedTeam}>
                                    {teams.map(team => <option value={team._id} key={team._id}>{team.name}</option>)}
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

                                <Form.Control placeholder="Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('fastestLaps', e.target.value)}/>
                            </Col>
                        </Form.Row>
                        <Form.Row style={{ marginTop: '25px' }}>
                            <Col sm={2} >
                                <Form.Label>History Wins</Form.Label>
                                <Form.Control placeholder="History Wins" style={{ width: '150px' }} onBlur={(e) => setStat('historyWins', e.target.value)}/>
                            </Col>
                            <Col sm={2}>
                                <Form.Label>History Points</Form.Label>

                                <Form.Control placeholder="History Points" style={{ width: '150px' }} onBlur={(e) => setStat('historyPoints', e.target.value)}/>
                            </Col>
                            <Col sm={2}>
                                <Form.Label>History FL</Form.Label>

                                <Form.Control placeholder="History Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('historyFastestLaps', e.target.value)} />
                            </Col>
                        </Form.Row>
                        <Button variant="warning" onClick={updateStats} style={{ marginTop: '10px' }}>
                            Update Team
                        </Button>
                    </Form>
                </div> : <div></div>
            }
            {selection === "Set Team Stats" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                    <h3>Set Team Stats</h3>
                    <Form>
                        <Form.Row>
                            <Col sm={2}>
                                <Form.Label>Select Team</Form.Label>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm={2}>
                                <Form.Control as='select'
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                value={selectedTeam}
                                >
                                    {teams.map(team => <option id={team._id} key={team._id} value={team._id}>{team.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm={2} >
                                <Form.Label>Season Wins</Form.Label>
                                <Form.Control placeholder="Wins" style={{ width: '150px' }}  onBlur={(e) => setStat('wins', e.target.value)} />
                            </Col>
                            <Col sm={2}>
                                <Form.Label>Season Points</Form.Label>

                                <Form.Control placeholder="Points" style={{ width: '150px' }}  onBlur={(e) => setStat('points', e.target.value)} />
                            </Col>
                            <Col sm={2}>
                                <Form.Label>Season FL</Form.Label>

                                <Form.Control placeholder="Fastest Laps" style={{ width: '150px' }}  onBlur={(e) => setStat('fastestLaps', e.target.value)} />
                            </Col>
                        </Form.Row>
                        <Form.Row style={{ marginTop: '25px' }}>
                            <Col sm={2} >
                                <Form.Label>History Wins</Form.Label>
                                <Form.Control placeholder="History Wins" style={{ width: '150px' }}  onBlur={(e) => setStat('historyWins', e.target.value)} />
                            </Col>
                            <Col sm={2}>
                                <Form.Label>History Points</Form.Label>

                                <Form.Control placeholder="History Points" style={{ width: '150px' }} onBlur={(e) => setStat('historyPoints', e.target.value)}/>
                            </Col>
                            <Col sm={2}>
                                <Form.Label>History FL</Form.Label>

                                <Form.Control placeholder="History Fastest Laps" style={{ width: '150px' }} onBlur={(e) => setStat('historyFastestLaps', e.target.value)}/>
                            </Col>
                            <Col sm={2}>
                                <Form.Label>Constructor Champs</Form.Label>

                                <Form.Control placeholder="Constructor Champs" style={{ width: '150px' }} onBlur={(e) => setStat('wcc', e.target.value)}/>
                            </Col>
                        </Form.Row>
                        <Button variant="warning" onClick={updateStats} style={{ marginTop: '10px' }}>
                            Set Driver
                        </Button>
                    </Form>
                </div> : <div></div>
            }
            </div>
        : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
        </div >

    )
}

export default AdminHome;