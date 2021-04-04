import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table, Td, Tr } from 'reactable';
function ConstructorStandings({loggedIn, setLoggedIn}) {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function getStandings() {
            const tmp = await axios.get('/api/WCC');
            console.log(tmp.data);
            setTeams(tmp.data);
        }
        getStandings();
    }, [])

    return (
        // <WCCTable teams={ConstructorStandings} />
        <div>
            <table className='table' id='table'>
                <tr>
                    <th>Team</th>
                    <th>Points</th>
                    <th>Wins</th>
                    <th>Fastest Laps</th>
                </tr>

                {teams.map(team => {
                    return (
                        <tr>
                            <td column='team Name'>{team.name}</td>
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