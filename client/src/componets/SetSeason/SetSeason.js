import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import GridContainer from '../theme/Grid/GridContainer';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridItem from '../theme/Grid/GridItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EmptyIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import FilledIcon from '@material-ui/icons/AddCircleTwoTone';
import DraftsIcon from '@material-ui/icons/Drafts';
import axios from 'axios';
import Button from '../theme/CustomButtons/Button'
import { type } from 'jquery';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        width: 295,
        marginRight: 0
    },
});

function createData(track) {
    return { track };
}

// const rows = [
//     createData('Bahrain')
// ];



const SetSeason = () => {
    const classes = useStyles();
    const [rows, setRows] = useState([createData('Bahrain')]);
    const [tracks, setTracks] = useState([]);
    const [season, setSeason] = useState([]);

    const getAllTracks = async () => {
        const tks = await axios.get('/api/allTracks');
        setTracks(tks.data);
    }

    const createSeason = async () => {
        // season.forEach(async (round, i) => {
        //     console.log(`Round ${i}: ${round}`)
        //     if (i === 0) {
        //         const seasonCreated = await axios.post('/api/createNewSeason');

        //     }
        //     const tmp = {
        //         track: round
        //     }
        //     // console.log(tmp)
        //     const roundCreated = await axios.post('/api/addRound', tmp)
        // })

        for (let i = 0; i < season.length; i++) {
            console.log(`Round ${i}: ${season[i]}`)
            if (i === 0) {
                const seasonCreated = await axios.post('/api/createNewSeason');
                console.log('created season');
                console.log(season[i]);
            }
            const tmp = {
                track: season[i]
            }
            console.log(tmp)
            const roundCreated = await axios.post('/api/addRound', tmp)
            console.log(`Just added Round ${i}: ${tmp.track}`);


        }
    }

    useEffect(() => {
        getAllTracks();
    }, []);

    useEffect(() => {

    }, [season])

    return (
        <div style={{ margin: '25px', width: '100%' }} >
            <GridContainer direction='row'>

                <GridItem md={6}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Round</TableCell>
                                    <TableCell align="center">Track</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {season.map((row, i) => (
                                    <TableRow key={row}>
                                        <TableCell component="th" scope="row">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center">{row}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </GridItem>
                <GridItem md={6}>
                    <h1>Select a Track </h1>
                    <List component="nav" aria-label="main mailbox folders">
                        {tracks.map(track => {
                            return (
                                <div className={classes.root}>

                                    <ListItem button onClick={e => {
                                        if (e.target.innerHTML.length < 50) {
                                            setSeason([...season, e.target.innerHTML])
                                        }
                                        else {
                                            alert('Try Again')
                                        }
                                    }}>
                                        <ListItemIcon>
                                            {season.indexOf(track.name) > -1 ? <FilledIcon /> : <EmptyIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={track.name} />
                                    </ListItem>


                                </div>
                            );
                        })}
                    </List>

                </GridItem>
                <GridItem md={12}>
                    <Button color='success' onClick={createSeason}>Complete</Button>
                </GridItem>
            </GridContainer>
        </div >
    )
}

export default SetSeason;