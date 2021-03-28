import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Table, Td, Tr} from 'reactable';
function ConstructorStandings() {

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
            <Table className='table' id='table'>
                {teams.map(team => {
                    return (
                        <Tr>
                            <Td column='Team Name'>{team.name}</Td>
                            <Td column='Points'>{team.points}</Td>
                            <Td column='Wins'>{team.wins}</Td>
                            <Td column='Fastest Laps'>{team.fastestLaps}</Td>
                        </Tr>
                    )
                })}

            </Table>
        </div>
    )
}

export default ConstructorStandings;