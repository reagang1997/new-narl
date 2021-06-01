import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from 'react-bootstrap'
import axios from 'axios';
import WDCTable from '../WDCTable';
import fs from 'fs';
import { Table, Tr, td } from 'reactable';
import TeamIcon from '../TeamIcon';
import Parallax from '../theme/Parallax/Parallax';
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import Header from '../theme/Header/Header';
import HeaderLinks from '../theme/Header/HeaderLinks';
import HeaderLinksRight from '../theme/Header/HeaderLinksRight';
const useStyles = makeStyles(styles);

function DriverStandings({ loggedIn, setLoggedIn }) {

    const [drivers, setdrivers] = useState([]);

    useEffect(() => {
        getStandings();
    }, [])

    const getStandings = async () => {
        const tmp = await axios.get('/api/WDC');
        let data = tmp.data;
        console.log(tmp.data);
        setdrivers(data);
    }
    // const getRaces = async () => {
    //     const response = await axios.get('/api/raceResults')
    //     console.log(response.data);
    // }

    // const Table = Reactable.Table;
    // const Tr = Reactable.Tr;
    // const td = Reactable.td;
    const classes = useStyles();

    return (
        <div>
            <Header
                color="transparent"
                brand="NARL"
                leftLinks={<HeaderLinks />}
                rightLinks={<HeaderLinksRight loggedIn={loggedIn}/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white",
                }}
            />
            
            <Parallax
                small
                filter
                image={require("../../assets/img/driverStandings.png").default}
            />
            <div >
                <Card body className={classNames(classes.main, classes.mainRaised, 'f1')}>

                    <table className='table table-hover table-responsive-lg' id='table'>
                        <tr>
                            <th>POS</th>
                            <th>Team</th>
                            <th>Driver Name</th>
                            <th>Points</th>
                            <th>Wins</th>
                            <th>Fastest Laps</th>
                        </tr>

                        {drivers.map((driver, i) => {
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
                                    <td column='Team'><TeamIcon teamName={driver.team} /></td>
                                    <td column='Driver Name'>{driver.name}</td>
                                    <td column='Points'>{driver.points}</td>
                                    <td column='Wins'>{driver.wins}</td>
                                    <td column='Fastest Laps'>{driver.fastestLaps}</td>
                                </tr>)
                        })}

                    </table>
                </Card>
            </div>
        </div>
    )
}

export default DriverStandings;