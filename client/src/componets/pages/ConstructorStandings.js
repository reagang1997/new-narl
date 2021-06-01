import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Card} from 'react-bootstrap';
import TeamIcon from '../TeamIcon'
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import  { useHistory } from 'react-router-dom'
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

import Header from '../theme/Header/Header';
import HeaderLinks from '../theme/Header/HeaderLinks';
import Parallax from '../theme/Parallax/Parallax'
import HeaderLinksRight from '../theme/Header/HeaderLinksRight';
const useStyles = makeStyles(styles);

function ConstructorStandings({loggedIn, setLoggedIn}) {

    const [teams, setTeams] = useState([]);
    const [clkTeam, setClkTeam] = useState('');

    const history = useHistory();

    useEffect(() => {
        async function getStandings() {
            const tmp = await axios.get('/api/WCC');
            console.log(tmp.data);
            setTeams(tmp.data);
        }
        getStandings();
    }, []);

    const classes = useStyles();
    

    return (
        // <WCCTable teams={ConstructorStandings} />
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
        image={require("../../assets/img/constructor-img.jpg").default}
    />
        <Card body  className={classNames(classes.main, classes.mainRaised, 'f1')} >

            <table className='table table-hover table-responsive-lg f1' id='table'>
                <tr>
                    <th style={{ width: "50px" }}>POS</th>
                    <th style={{ width: "75px" }}>Team</th>
                    <th style={{ width: "75px" }}>Drivers</th>
                    <th style={{ width: "100px" }}>Points</th>
                    <th style={{ width: "100px" }}>Wins</th>
                    <th style={{ width: "100px" }}>Fastest Laps</th>
                </tr>

                {teams.map((team, i) => {
                    let pos;
                    let drivers = team.drivers;
                    if (i === 0){
                        pos = 'first'
                    }
                    else if( i === 1){
                        pos = 'second'
                    }
                    else if( i === 2){
                        pos = 'third'
                    }
                    return (
                        <tr>
                            <td className={pos}>{i+1}</td>
                            <td column='Team' className='team' id={team.name}><TeamIcon teamName={team.name}/></td>
                            <td column='Drivers' className='drivers'>{drivers.map(tmp => {return (<p>#{tmp.driverNumber} {tmp.name}</p>)})}</td>
                            <td column='Points'>{team.points}</td>
                            <td column='Wins'>{team.wins}</td>
                            <td column='Fastest Laps'>{team.fastestLaps}</td>
                        </tr>)
                })}

            </table>
        </Card>
        </div>
    )
}

export default ConstructorStandings;