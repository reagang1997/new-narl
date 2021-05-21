import React, { useEffect, useState } from 'react';
import { Nav, Form, Button, Col, ToggleButton, ToggleButtonGroup, Card } from 'react-bootstrap';
import TrackInfo from '../SetTrackInfo';
import axios from 'axios';

const AdminHome = ({ loggedIn, setLoggedIn }) => {
    const [selection, setSelection] = useState('');
    const [stats, setStats] = useState([])
    const [newDriver, setNewDriver] = useState({ name: '' });
    const [newTeam, setNewTeam] = useState({ name: '' })
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [checkValue, setValue] = useState([1, 3])
    const [selectedDriver, setSelectedDriver] = useState(''); //stores driver id
    const [selectedTeam, setSelectedTeam] = useState('')
    const [singleDriver, setSingleDriver] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [filesTP, setFilesTP] = useState([]);
    const [clk, setClk] = useState(0);
    useEffect(() => {

        getDrivers();
        getTeams();
    }, [selection]);

    useEffect(() => {
        findFilesToParse();
    }, [clk]);

    useEffect(() => {
        findDriver();
    },[selectedDriver]);

    const getAllResults = async () => {
        let results = await axios.get('/api/allResults');
        let files = [];
        for (let i = 2; i < results.data.length; i++) {
            let tmp = {
                name: results.data[i].name
            }
            files.push(tmp);
        }

        console.log(files);
        setAllResults(files);
    }

    const findFilesToParse = async () => {
        //turn to for each
        let ftp = [];
        allResults.forEach(async (result) => {
            const file = await axios.get(`/api/findResult/${result.name}`);
            ftp.push(file.data);
            console.log(ftp);
        });
        setFilesTP(ftp)
    }

    const addPractice = async (e) => {
        const added = await axios.get(`/api/readFile/${e.target.id}`);
        setClk(clk + 1);
    }

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
        setNewDriver({name: ""})
    };

    const deleteDriver = async () => {
        const deletedDriver = await axios.get(`/api/deleteDriver/${selectedDriver}`);
        console.log(deleteDriver);
        getDrivers();
    }

    const clearPractice = async (e) => {
        const deleted = await axios.get('/api/clearPracticeResults');
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
            if (selection.indexOf('Inc') != -1) {
                stats.forEach(async (stat) => {
                    const updatedResult = await axios.put(`/api/IncTeamStats/${selectedTeam}`, stat);
                    console.log(updatedResult);
                                })
            }
            else {
                stats.forEach(async (stat) => {
                    const updatedResult = await axios.put(`/api/SetTeamStats/${selectedTeam}`, stat);
                    console.log(updatedResult);
                })
            }
        }

        setStats([]);
        setSelectedDriver('');
        setSelectedTeam('');
        

    }

    const findDriver = async () => {
        const found = await axios.get(`/api/singleDriver/${selectedDriver}`);
        setSingleDriver(found.data);
    }

    return (
        <div>
            <div>
                <Nav defaultActiveKey="/home" className="justify-content-center">
                    <Nav.Link href="/adminHome">Admin Home</Nav.Link>
                    <Nav.Link eventKey="link-1" onClick={(e) => setSelection(e.target.innerHTML)}>Add Driver</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)} >Add Team</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Inc Driver Stats</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Set Driver Stats</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Inc Team Stats</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Set Team Stats</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => setSelection(e.target.innerHTML)}>Set Track Info</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={(e) => {
                        setSelection(e.target.innerHTML);
                        getAllResults();
                        findFilesToParse();
                    }}>Update Practice</Nav.Link>
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
                            <Form.Control style={{ width: '250px' }} placeholder="Enter Driver Name" value={newDriver.name} onChange={(e) => setNewDriver({ name: e.target.value })} />
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
                            <Col sm={2}>
                                <Form.Label>Select Team</Form.Label>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm={2}>
                                <Form.Control as='select'
                                    value={selectedDriver}
                                    onChange={(e) => setSelectedDriver(e.target.value)}>
                                    <option>Select Driver</option>    

                                    {drivers.map(driver => <option id={driver._id} key={driver._id} value={driver._id}>{driver.name}</option>)}
                                </Form.Control>
                            </Col>
                            <Col sm={2}>
                                <Form.Control as='select'
                                    value={selectedTeam}
                                    onChange={(e) => {setSelectedTeam(e.target.value); setStat('team', e.target.value)}}>
                                    <option>Select Team</option>    

                                    {teams.map(team => <option id={team._id} key={team._id} value={team._id}>{team.name}</option>)}
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
                        <Button variant="danger" onClick={deleteDriver}>
                            Delete Driver
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
                </div> : <div></div>
                }
                {selection === "Update Practice" ? <div style={{ marginLeft: '25%', marginRight: '25%' }}>
                    <h1>Files to add</h1>
                    {filesTP.map(file => {
                        if (file === "") {
                            return;
                        }

                        return (<div><Card body style={{ marginTop: '25px' }}>
                            {file.fileName}
                            <Button variant='warning' style={{ marginLeft: '580px' }} id={file.fileName} onClick={addPractice}>Add File</Button>
                        </Card>
                        </div>)
                    })
                    }
                    
                    <Button variant='danger' onClick={clearPractice}>Clear Practice</Button>
                </div> : <div></div>}
                {singleDriver ?
                    <table className='table table-responsive-lg' > 
                        <tr>
                            <th>Name</th>
                            <th>Team</th>
                            <th>S Points</th>
                            <th>S Wins</th>
                            <th>S FL</th>
                            <th>C Points</th>
                            <th>C Wins</th>
                            <th>C FL</th>
                        </tr>
                        <tr>
                            <td>{singleDriver.name}</td>
                            <td>{singleDriver.team}</td>
                            <td>{singleDriver.points}</td>
                            <td>{singleDriver.wins}</td>
                            <td>{singleDriver.fastestLaps}</td>
                            <td>{singleDriver.careerPoints}</td>
                            <td>{singleDriver.careerWins}</td>
                            <td>{singleDriver.careerFastestLaps}</td>
                        </tr>
                    </table> : <div></div> }
                {selection === "Set Track Info" ? <div>
                    <TrackInfo></TrackInfo>
                    <Button onClick={async (e) => {
                        const nextWeekend = await axios.post('/api/nextWeekend');
                        console.log('went to next weekend')
                    }}>Next Weekend</Button>
                </div> : <div></div>}    
            </div>
              

        </div >

    )
}

export default AdminHome;