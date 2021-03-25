import React from 'react';
import WCCRow from '../WCCRow';
import './style.css';
function WCCTable({ teams }) {
    return (
        <div className='wcc-container'>

            <table class="table rounded table-hover table-responsive-lg">
                <thead>
                    <tr>
                        <th scope="col">POS</th>
                        <th scope="col">Team</th>
                        <th scope="col">Points</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Fastest Laps</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(({ team, points, wins, fastestLaps }, i) => <WCCRow team={team} points={points} wins={wins} fastestLaps={fastestLaps} key={i} pos={i + 1} />)}
                </tbody>
            </table>
        </div>

    )
}

export default WCCTable;