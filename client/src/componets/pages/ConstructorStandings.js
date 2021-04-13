import React, { useEffect, useState } from 'react';
import axios from 'axios'
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

    const handleClick = (e) => {
        history.push(`/teams/${e.target.id}`);
    }

    return (
        // <WCCTable teams={ConstructorStandings} />
        <div>
            <table className='table' id='table'>
                <tr>
                    <th style={{ width: "50px" }}>POS</th>
                    <th style={{ width: "75px" }}>Team</th>
                    <th style={{ width: "100px" }}>Points</th>
                    <th style={{ width: "100px" }}>Wins</th>
                    <th style={{ width: "100px" }}>Fastest Laps</th>
                </tr>

                {teams.map((team, i) => {
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td column='Team' className='team' onClick={handleClick} id={team.name}><TeamIcon teamName={team.name}/></td>
                            <td column='Points'>{team.points}</td>
                            <td column='Wins'>{team.wins}</td>
                            <td column='Fastest Laps'>{team.fastestLaps}</td>
                        </tr>)
                })}

            </table>
        </div>
    )
}

export default ConstructorStandings;