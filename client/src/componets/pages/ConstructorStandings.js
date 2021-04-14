import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Card} from 'react-bootstrap';
import TeamIcon from '../TeamIcon'
import  { useHistory } from 'react-router-dom'

import { Table, Td, Tr } from 'reactable';
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

    

    return (
        // <WCCTable teams={ConstructorStandings} />
        <Card body className='f1 box' style={{width: '800px', margin: 'auto', marginTop: '50px'}}>

            <table className='table table-responsive-lg f1' id='table'>
                <tr>
                    <th style={{ width: "50px" }}>POS</th>
                    <th style={{ width: "75px" }}>Team</th>
                    <th style={{ width: "100px" }}>Points</th>
                    <th style={{ width: "100px" }}>Wins</th>
                    <th style={{ width: "100px" }}>Fastest Laps</th>
                </tr>

                {teams.map((team, i) => {
                    let pos;
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
                            <td column='Points'>{team.points}</td>
                            <td column='Wins'>{team.wins}</td>
                            <td column='Fastest Laps'>{team.fastestLaps}</td>
                        </tr>)
                })}

            </table>
        </Card>
    )
}

export default ConstructorStandings;